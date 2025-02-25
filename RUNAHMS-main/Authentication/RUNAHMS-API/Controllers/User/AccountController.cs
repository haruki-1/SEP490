using API.Utils;
using Business_Object.DTO.Request;
using GraduationAPI_EPOSHBOOKING.IRepository;
using GraduationAPI_EPOSHBOOKING.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GraduationAPI_EPOSHBOOKING.Controllers.User
{
    [ApiController]
    [Route("api/v1/account")]
    [Authorize(Roles = "User")]
    public class AccountController : Controller
    {
        private readonly IAccountRepository _accountRepository;
        public AccountController(IAccountRepository accountRepository) { 
                
            _accountRepository = accountRepository;
        }

        [HttpPut("change-password"),Authorize]
        public IActionResult ChangePassword([FromBody] ChangePasswordRequest request)
        {
            int accountID = JWTHandler.GetUserIdFromHttpContext(HttpContext);
            var response = _accountRepository.ChangePassword(accountID, request.OldPassword, request.NewPassword);
            return StatusCode(response.StatusCode, response);
        }


        [HttpPut("update-profile"),Authorize]
        public IActionResult UpdateProfileByAccount([FromForm] String? email, [FromForm] String? phone, [FromForm] Profile? profile, [FromForm] IFormFile? Avatar)
        {
            int accountID = JWTHandler.GetUserIdFromHttpContext (HttpContext);
            var response = _accountRepository.UpdateProfileByAccount(accountID, email, phone, profile, Avatar);
            return StatusCode(response.StatusCode, response);

        }
    }
}
