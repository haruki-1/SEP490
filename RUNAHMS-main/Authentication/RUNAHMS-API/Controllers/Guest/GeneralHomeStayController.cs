using DAL.IRepository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace RUNAHMS_API.Controllers.Guest
{
    [ApiController]
    [Route("api/v1/guest/home-stay")]
    [AllowAnonymous]
    public class GeneralHomeStayController : Controller
    {
        private readonly IHomeStayRepository _homeStayRepository;
       public GeneralHomeStayController(IHomeStayRepository homeStayRepository) { 
        
            _homeStayRepository = homeStayRepository;
        }

        [HttpGet("get-all")]
        public IActionResult GetAllHomeStay()
        {
           var reponse = _homeStayRepository.GetAllHomeStay();
            return StatusCode(reponse.StatusCode, reponse);
        }

        [HttpGet("get-detail")]
        public IActionResult GetHomeStayDetail([FromQuery]int id) { 

            var respone = _homeStayRepository.GetHomeStayDetail(id);
            return StatusCode(respone.StatusCode, respone);
        }

        [HttpGet("get-by-city")]
        public IActionResult GetByCity([FromQuery] string city)
        {
            var reponse = _homeStayRepository.GetHomeStayByCity(city);
            return StatusCode(reponse.StatusCode, reponse);
        }
    }
}
