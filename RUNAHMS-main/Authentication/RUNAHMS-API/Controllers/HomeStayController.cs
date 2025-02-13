using BusinessObject.DTO;
using BusinessObject.Entities;
using BusinessObject.Interfaces;
using Microsoft.AspNetCore.Mvc;

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
    }
}
