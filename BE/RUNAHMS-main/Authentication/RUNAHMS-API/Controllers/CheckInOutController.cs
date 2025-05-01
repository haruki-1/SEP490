using BusinessObject.DTO;
using BusinessObject.Entities;
using BusinessObject.Interfaces;
using Bussiness_Object.DTO;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CheckInOutLogController(IRepository<CheckInOutLog> _logRepository,
        IRepository<CheckInOutImage> _imageRepository,
        IWebHostEnvironment _env,
        IBookingRepository _bookingRepository,
        IRepository<HomeStay> _homeStayRepository,
        IEmailSender _emailSender) : ControllerBase
    {
        [HttpPost("add-log")]
        public async Task<IActionResult> AddLog([FromForm] CheckInOutRequest request)
        {
            try
            {
                if (request == null) return BadRequest();
                var getBooking = await _bookingRepository.FindWithInclude()
                                                   .Include(x => x.User)
                                                   .FirstOrDefaultAsync(x => x.Id == request.BookingId);
                if (getBooking == null)
                {
                    return NotFound("Booking not found");
                }
                if (request.ActionType == "CheckIn")
                {
                    var getHomeStay = await _homeStayRepository.FindWithInclude().FirstOrDefaultAsync(x => x.Name.Equals(getBooking.HomeStayName));
                    if (getHomeStay != null)
                    {

                        string emailContent = $@"
                <p>Xin chào {getBooking.User.FullName},</p>

                <p>Cảm ơn bạn đã đặt phòng với chúng tôi! Dưới đây là thông tin chi tiết cho kỳ nghỉ của bạn:</p>

                <ul>
                    <li><b>Check-in:</b> {getBooking.CheckInDate:dd/MM/yyyy HH:mm}</li>
                    <li><b>Check-out:</b> {getBooking.CheckOutDate:dd/MM/yyyy HH:mm}</li>
                </ul>

                <h3 style='color: #2E86C1;'>🔒 Mật mã mở khóa cửa của home stay {getBooking.HomeStayName}:</h3>
                <p style='font-size: 20px; font-weight: bold; background-color: #f2f2f2; padding: 10px; width: fit-content; border-radius: 8px;'>
                    {getHomeStay.Password}
                </p>

                <p>Xin lưu ý: Mật mã này sẽ có hiệu lực từ thời gian Check-in đến Check-out.</p>

                <br>

                <p>Chúng tôi mong được chào đón bạn sớm!</p>

                <p style='color: gray;'>Trân trọng,<br>Đội ngũ khách sạn</p>
                ";
                    await _emailSender.SendEmailAsync(getBooking.User.Email, "Door Password", emailContent);
                    }
                }


                // 1. Tạo mới 1 Log entry
                var log = new CheckInOutLog
                {
                    BookingId = request.BookingId,
                    ActionType = request.ActionType,
                    Note = request.Note,
                    ActionTime = DateTime.Now
                };

                await _logRepository.AddAsync(log);
                await _logRepository.SaveAsync(); // 🆗 Lưu CheckInOutLog trước

                // 2. Nếu có ảnh thì lưu vào CheckInOutImage thay vì CheckInOutLog
                if (request.Images != null && request.Images.Any())
                {
                    foreach (var file in request.Images)
                    {
                        if (file != null && file.Length > 0 && !string.IsNullOrEmpty(file.FileName))
                        {
                            var fileName = Guid.NewGuid() + Path.GetExtension(file.FileName);

                            // Thư mục lưu ảnh
                            var uploadDirectory = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images");
                            var uploadPath = Path.Combine(uploadDirectory, fileName);

                            // Tạo thư mục nếu chưa tồn tại
                            if (!Directory.Exists(uploadDirectory))
                            {
                                Directory.CreateDirectory(uploadDirectory);
                            }

                            using var stream = new FileStream(uploadPath, FileMode.Create);
                            await file.CopyToAsync(stream);

                            // Tạo bản ghi mới cho CheckInOutImage, liên kết với log vừa tạo
                            var imageUrl = "/images/" + fileName; // URL để truy cập ảnh

                            var image = new CheckInOutImage
                            {
                                LogId = log.Id,  // Liên kết ảnh với log vừa tạo
                                ImageUrl = imageUrl
                            };
                            await _imageRepository.AddAsync(image);
                        }
                        else
                        {
                            Console.WriteLine("Invalid file detected.");
                        }
                    }
                    await _imageRepository.SaveAsync();
                }

                return Ok(new { Message = "Add Check-In/Out Log Success", LogId = log.Id });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.ToString());
            }
        }


        [HttpGet("get-all")]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var logs = await _logRepository.Find(x => true)
                    .Include(x => x.Images) // Include Images dựa theo LogId
                    .Select(log => new CheckInOutLogDTO
                    {
                        Id = log.Id,
                        BookingId = log.BookingId,
                        ActionType = log.ActionType,
                        Note = log.Note,
                        ActionTime = log.ActionTime,
                        Images = log.Images != null
                                ? log.Images.Select(img => img.ImageUrl).ToList()
                                : new List<string>() // Nếu không có ảnh thì trả array rỗng
                    })
                    .ToListAsync();

                if (logs.Count == 0) return NotFound(new { Message = "No logs found" });

                return Ok(logs);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpDelete("delete-log")]
        public async Task<IActionResult> DeleteLog([FromBody] DeleteListDTO request)
        {
            try
            {
                if (request == null || !request.ID.Any()) return BadRequest();

                var logs = await _logRepository.Find(x => request.ID.Contains(x.Id)).ToListAsync();
                if (!logs.Any()) return NotFound();

                foreach (var log in logs)
                {
                    log.IsDeleted = true;
                    await _logRepository.UpdateAsync(log); // dùng UpdateAsync thay vì Delete
                }
                await _logRepository.SaveAsync();
                return Ok(new { Message = "Delete Check-In/Out Log Success" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.ToString());
            }
        }
    }
}