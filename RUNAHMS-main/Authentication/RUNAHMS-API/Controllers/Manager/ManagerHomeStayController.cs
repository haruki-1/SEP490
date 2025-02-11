using System.Runtime.CompilerServices;
using API.Utils;
using Bussiness_Object.DTO.Request;
using DAL.IRepository;
using GraduationAPI_EPOSHBOOKING.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace RUNAHMS_API.Controllers.Manager
{
    [ApiController]
    [Route("api/v1/home-stay")]
    [Authorize(Roles = "Manager")]
    public class ManagerHomeStayController : Controller
    {
       private readonly IHomeStayRepository _homeStayRepository;
       
        public ManagerHomeStayController(IHomeStayRepository homeStayRepository) {
            _homeStayRepository = homeStayRepository;
        }

        [HttpPost("add-home-stay"),Authorize]
        public IActionResult AddHomeStay([FromForm] AddHomeStayRequest request)
        {
            int accountID = JWTHandler.GetUserIdFromHttpContext(HttpContext);
            var services = JsonConvert.DeserializeObject<List<ServiceTypeDTO>>(request.Services);
            var response = _homeStayRepository.AddHomeStay(accountID,request, services);
            return StatusCode(response.StatusCode, response);
        }

        [HttpPost("delete-home-stay-image")]
        public IActionResult DeleteHomeStayImage([FromQuery] int imageID)
        {
            var reponse = _homeStayRepository.DeleteHomeStayImages(imageID);
            return StatusCode(reponse.StatusCode, reponse);
        }

        [HttpDelete("add-home-stay-image")]
        public IActionResult AddHomeStayImage([FromForm] int hotelId, [FromForm] String title, [FromForm] IFormFile images)
        {
           var reponse = _homeStayRepository.AddHomeStayImage(hotelId, title, images);
           return StatusCode(reponse.StatusCode,reponse);
        }

    }
}
