using BusinessObject.DTO;
using BusinessObject.Entities;
using BusinessObject.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CheckInOutLogController(IRepository<CheckInOutLog> _logRepository, IRepository<CheckInOutImage> _imageRepository, IWebHostEnvironment _env) : ControllerBase
    {
        [HttpPost("add-log")]
        public async Task<IActionResult> AddLog([FromForm] CheckInOutRequest request)
        {
            try
            {
                if (request == null) return BadRequest();

                var log = new CheckInOutLog
                {
                    BookingId = request.BookingId,
                    ActionType = request.ActionType,
                    Note = request.Note,
                    ActionTime = DateTime.Now
                };

                await _logRepository.AddAsync(log);
                await _logRepository.SaveAsync();

                // Xử lý ảnh upload
                if (request.Images != null && request.Images.Any())
                {
                    foreach (var file in request.Images)
                    {
                        var fileName = Guid.NewGuid() + Path.GetExtension(file.FileName);
                        var uploadPath = Path.Combine(_env.WebRootPath, "uploads", fileName);

                        Directory.CreateDirectory(Path.GetDirectoryName(uploadPath)!);

                        using var stream = new FileStream(uploadPath, FileMode.Create);
                        await file.CopyToAsync(stream);

                        var image = new CheckInOutImage
                        {
                            LogId = log.Id,
                            ImageUrl = "/uploads/" + fileName
                        };
                        await _imageRepository.AddAsync(image);
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
                var list = await _logRepository.Find(x => true)
                    .Include(x => x.Images)
                    .ToListAsync();

                if (list.Count == 0) return NotFound(new { Message = "No logs found" });
                return Ok(list);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.ToString());
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