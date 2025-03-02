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
        IRepository<HomestayAmenity> _homeStayAmenity,
        HttpClient _httpClient,
        IRepository<HomeStayFacility> _homestayFacility,
        IRepository<Facility> _facilityRepository
            ) : ControllerBase
    {

        [HttpPost("add-home-stay-facility")]
        public async Task<IActionResult> AddHomeStayFacility(AddHomeStayFacilityDTO request)
        {
            try
            {
                HomeStayFacility addFacility = new HomeStayFacility
                {
                    FacilityID = request.FacilityID,
                    HomeStayID = request.HomeStayID,
                };
                await _homestayFacility.AddAsync(addFacility);
                await _homestayFacility.SaveAsync();
                return Ok(new { Message = "Add Facility Success" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }
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

        [HttpPut("edit-home-stay-information")]
        public async Task<IActionResult> EditHomeStay([FromBody]EditHomeStayInforRequest request)
        {
            try
            {
                var getHomeStay = await _homeStayRepository.GetByIdAsync(request.HomeStayID);
                if (getHomeStay == null)
                {
                    return NotFound();
                }
                getHomeStay.Name = request.Name ?? getHomeStay.Name;
                getHomeStay.MainImage = request.MainImage ?? getHomeStay.MainImage;
                getHomeStay.Standar = getHomeStay.Standar = request.Standar != 0 ? request.Standar : getHomeStay.Standar;
                getHomeStay.CheckOutTime = request.CheckOutTime ?? getHomeStay.CheckOutTime;
                getHomeStay.CheckInTime = request.CheckInTime ?? getHomeStay.CheckInTime;
                getHomeStay.Address = request.Address ?? getHomeStay.Address;
                getHomeStay.OpenIn = request.OpenIn = request.OpenIn != 0 ? request.OpenIn : getHomeStay.OpenIn;
                getHomeStay.Description = request.Description ?? getHomeStay.Description    ;
                await _homeStayRepository.UpdateAsync(getHomeStay);
                await _homeStayRepository.SaveAsync();
                return Ok(new { Message = "Update Home Stay Success" });
            }
            catch (Exception ex) {
                return StatusCode(500, new { Message = "An error occurred", Error = ex.Message });
            }
        }

        [HttpDelete("delete-home-stay")]
        public async Task<IActionResult> DeleteHomeStay([FromQuery]Guid homeStayID)
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

        

        [HttpGet("filter-home-stay-with-status")]
        public async Task<IActionResult> FilterHomeStayWithStatus([FromQuery] bool status)
        {
            var filter = await _homeStayRepository.Find(x => x.isDeleted == status).ToListAsync();
            if(filter.Any())
            {
                return Ok(filter);

            }
            return NotFound();
        }
    
    


        [HttpPost("add-home-stay-image")]
        public async Task<IActionResult> AddHomeStayImage([FromBody]HomeStayImageDTO request)
        {
            var getHomeStay = await _homeStayRepository.GetByIdAsync(request.HomeStayID);
            foreach (var item in request.Images) {

                Guid imageID = Guid.NewGuid();
                HomeStayImage addImage = new HomeStayImage
                {
                    Id = imageID,
                    Image = item,
                    HomeStay = getHomeStay,
                    isDeleted = false
                };
                await _homeStayImageRepository.AddAsync(addImage);
            }
            await _homeStayImageRepository.SaveAsync();
            return Ok(new {Message = "Add Image Success"});
        }

        [HttpDelete("delete-home-stay-image")]
        public async Task<IActionResult> DeleteHomeStayImage([FromBody] DeleteHomeStayImageDTO request)
        {
            if (request == null || request.ImageIds == null || !request.ImageIds.Any())
            {
                return BadRequest(new { Message = "Invalid request data." });
            }
            var imagesToDelete = await _homeStayImageRepository
                .Find(h => request.ImageIds.Contains(h.Id))
                .ToListAsync();

            if (!imagesToDelete.Any())
            {
                return NotFound(new { Message = "No matching images found." });
            }

            _homeStayImageRepository.DeleteRange(imagesToDelete);
            await _homeStayImageRepository.SaveAsync();

            return Ok(new { Message = "Images deleted successfully" });
        }

    }
}


