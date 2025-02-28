using API.Utils;
using Azure.Core;
using Business_Object.DTO.Request;
using GraduationAPI_EPOSHBOOKING.IRepository;
using GraduationAPI_EPOSHBOOKING.Model;
using GraduationAPI_EPOSHBOOKING.Ultils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Client;

#pragma warning disable // tắt cảnh báo để code sạch hơn

namespace GraduationAPI_EPOSHBOOKING.Controllers.Auth
{
    [ApiController]
    [Route("api/v1/auth")]
    [AllowAnonymous]
    public class AuthController : Controller
    {

        private readonly IAccountRepository repository;
        private readonly IConfiguration configuration;
        public AuthController(IAccountRepository repository, IConfiguration configuration)
        {
            this.repository = repository;
            this.configuration = configuration;
        }

        [HttpPost("register-manager")]
        public IActionResult RegisterAdmin([FromForm]Account account, [FromForm]string fullName)
        {
            var reponse = repository.RegisterManagerAccount(account,fullName);
            return StatusCode(reponse.StatusCode, reponse);
        }
        [HttpPost("login-phone")]
        public IActionResult LoginPhone([FromForm] String phone)
        {
            var response = repository.LoginWithNumberPhone(phone);
            return StatusCode(response.StatusCode, response);
        }

        [HttpPut("active-account")]
        public IActionResult ActiveAccount([FromForm] String email)
        {
            var response = repository.ActiveAccount(email);
            return StatusCode(response.StatusCode, response);
        }

        [HttpPost("register-customer")]
        public IActionResult Register([FromBody] RegisterDTO register)
        {
            var response = repository.Register(register.Email, register.Password, register.FullName, register.Phone);
            return StatusCode(response.StatusCode, response);
        }

        [HttpPost("send-mail")]
        public IActionResult SendOTPForgot([FromBody] String email)
        {
            var response = Utils.sendMail(email);
            return Ok(response);
        }

        [HttpPut("update-new-password")]
        public IActionResult UpdateNewPassword([FromForm] String newPassword, [FromForm] String email)
        {
            var response = repository.UpdateNewPassword(email, newPassword);
            return StatusCode(response.StatusCode, response);
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginDTO login)
        {
            var response = repository.Login(login.text, login.Password);
            return StatusCode(response.StatusCode, response);
        }
     
        [HttpGet("get-profile-by-account"),Authorize]
        public IActionResult GetProfileByAccountId()
        {

            int accountID = JWTHandler.GetUserIdFromHttpContext(HttpContext);
            var response = repository.GetProfileByAccountId(accountID);
            return StatusCode(response.StatusCode, response);
        }

        [HttpPost("google-login")]
        public IActionResult GoogleLogin([FromForm] String email, [FromForm] String userName, [FromForm] String avartar)
        {
            var reponse = repository.GoogleLogin(email, userName, avartar);
            return StatusCode(reponse.StatusCode, reponse);
        }
    }
}
