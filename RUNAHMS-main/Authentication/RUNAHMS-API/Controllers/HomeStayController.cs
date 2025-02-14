using BusinessObject.DTO;
using BusinessObject.Entities;
using BusinessObject.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace RUNAHMS_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HomeStayController(IRepository<HomeStay> _homeStayRepository,
        IRepository<User> _userRepository,
        IRepository<HomeStayImage> _homeStayImageRepository,
        IRepository<Calendar> _calendarRepository,
        IWebHostEnvironment _eviroment,
        IRepository<Amenity> _amenityRepository,
        IRepository<HomestayAmenity> _homeStayAmenity
            ) : ControllerBase
    {
        [HttpPost("add-home-stay")]
        public async Task<IActionResult> AddHomeStay([FromHeader(Name = "X-User-Id")] Guid userID, [FromBody] AddHomeStayRequest request)
        {
            var user = await _userRepository.GetByIdAsync(userID);
            Guid homeStayID = Guid.NewGuid();
            HomeStay createHomeStay = new HomeStay
            {
                Id = homeStayID,
                MainImage = request.MainImage,
                Name = request.Name,
                Description = request.Description,
                Address = request.Address,
                CheckInTime = request.CheckInTime,
                CheckOutTime = request.CheckOutTime,
                isBooked = request.isBlocked,
                isDeleted = request.IsDeleted,
                City = request.City,
                OpenIn = request.OpenIn,
                Standar = request.Standar,
                User = user
            };
            await _homeStayRepository.AddAsync(createHomeStay);
            var calendarTask = _calendarRepository.AddAsync(new Calendar
            {
                Date = request.Date,
                Price = request.Price,
                isDeleted = request.IsDeleted,
                HomeStay = createHomeStay
            });

            foreach (var image in request.Images)
            {
                Guid imageID = Guid.NewGuid();
                HomeStayImage addImage = new HomeStayImage
                {
                    Id = imageID,
                    Image = image,
                    HomeStay = createHomeStay
                };

                await _homeStayImageRepository.AddAsync(addImage);
            }
            await _homeStayImageRepository.SaveAsync();


            return Ok(new { message = "Add Home Stay Success." });
        }



        [HttpDelete("delete-home-stay")]
        public async Task<IActionResult> DeleteHomeStay([FromQuery] Guid homeStayID)
        {
            var checkDelete = await _homeStayRepository.GetByIdAsync(homeStayID);
            if (checkDelete != null && checkDelete.isDeleted == false)
            {
                checkDelete.isDeleted = true;
                await _homeStayRepository.UpdateAsync(checkDelete);
                await _homeStayRepository.SaveAsync();
                return Ok(new { Message = "Delete Success" });
            }
            else if (checkDelete != null && checkDelete.isDeleted == true)
            {
                checkDelete.isDeleted = false;
                await _homeStayRepository.UpdateAsync(checkDelete);
                await _homeStayRepository.SaveAsync();
                return Ok(new { Message = "Restore Home Stay Success" });
            }
            return NotFound();
        }

        [HttpPost("get-all-home-stay")]
        public async Task<IActionResult> GetAllHomeStay([FromBody] FilterDTO request)
        {
            var query = _homeStayRepository
                .FindWithInclude(h => h.Calendars!)
                .Include(h => h.HomestayAmenities!)
                .ThenInclude(ha => ha.Amenity)
                .AsQueryable();

            if (request.Standard is { Count: > 0 })
            {
                query = query.Where(h => request.Standard.Contains(h.Standar));
            }

            if (request.AmenityNames is { Count: > 0 })
            {
                query = query.Where(h =>
                    h.HomestayAmenities!.Any(ha => request.AmenityNames.Contains(ha.Amenity.Name)));
            }


            if (request.MinPrice.HasValue || request.MaxPrice.HasValue)
            {
                query = query.Where(h => h.Calendars!.Any(c =>
                    (!request.MinPrice.HasValue || c.Price >= request.MinPrice.Value) &&
                    (!request.MaxPrice.HasValue || c.Price <= request.MaxPrice.Value)
                ));
            }

            var listHomeStay = await query.ToListAsync();

            if (!listHomeStay.Any())
            {
                return NotFound();
            }

            var response = listHomeStay.Select(h => new
            {
                h.Id,
                h.Name,
                h.MainImage,
                h.Address,
                h.City,
                h.CheckInTime,
                h.CheckOutTime,
                h.OpenIn,
                h.Description,
                h.Standar,
                h.isDeleted,
                h.isBooked,

                Calendar = h.Calendars!.Select(c => new
                {
                    c.Id,
                    c.Date,
                    c.Price
                }).ToList(),

            
            }).ToList();

            return Ok(response);
        }
    }
}
