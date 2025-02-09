using API.Utils;
using GraduationAPI_EPOSHBOOKING.IRepository;
using GraduationAPI_EPOSHBOOKING.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Client;
#pragma warning disable // tắt cảnh báo để code sạch hơn

namespace GraduationAPI_EPOSHBOOKING.Controllers.Manager
{
    [ApiController]
    [Route("api/v1/manager/blog")]
    [Authorize(Roles = "Manager")]
    public class UserBlogController : Controller
    {
        private readonly IBlogRepository _blogRepository;
        private readonly IConfiguration configuration;
        public UserBlogController(IBlogRepository blogRepository, IConfiguration configuration)
        {
            _blogRepository = blogRepository;
            this.configuration = configuration;
        }

        [HttpGet("get-blog-by-account"), Authorize]
        public IActionResult GetBlogsByAccountId()
        {
            int accountID = JWTHandler.GetUserIdFromHttpContext(HttpContext);
            var response = _blogRepository.GetBlogsByAccountId(accountID);
            return StatusCode(response.StatusCode, response);
        }

        [HttpPost("create-blog"), Authorize]
        public IActionResult CreateBlog([FromForm] Blog blog, [FromForm] List<IFormFile> image)
        {
            int accountID = JWTHandler.GetUserIdFromHttpContext(HttpContext);
            var response = _blogRepository.CreateBlog(blog, accountID, image);
            return StatusCode(response.StatusCode, response);
        }

        [HttpDelete("delete-blog"), Authorize]
        public IActionResult DeleteBlog([FromQuery] int blogId)
        {
            var response = _blogRepository.DeleteBlog(blogId);
            return StatusCode(response.StatusCode, response);
        }

    }
}
