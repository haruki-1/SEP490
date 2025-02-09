using API.Utils;
using Business_Object.DTO.Request;
using GraduationAPI_EPOSHBOOKING.IRepository;
using GraduationAPI_EPOSHBOOKING.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Client;
#pragma warning disable // tắt cảnh báo để code sạch hơn

namespace GraduationAPI_EPOSHBOOKING.Controllers.User
{
    [ApiController]
    [Route("api/v1/user/blog")]
    [Authorize(Roles = "User")]
    public class UserBlogController : Controller
    {
        private readonly IBlogRepository _blogRepository;
        private readonly IConfiguration configuration;
        public UserBlogController(IBlogRepository blogRepository, IConfiguration configuration)
        {
            _blogRepository = blogRepository;
            this.configuration = configuration;
        }
        [HttpPost("comment-blog"), Authorize]
        public IActionResult CommentBlog([FromForm] int blogId, [FromForm] string description)
        {
            int accountID = JWTHandler.GetUserIdFromHttpContext(HttpContext);
            var response = _blogRepository.CommentBlog(blogId, accountID, description);
            return StatusCode(response.StatusCode, response);
        }

        [HttpPost("reply-comment"),Authorize]
        public IActionResult ReplyComment([FromBody] ReplyCommentDTO request)
        {
            int accountID = JWTHandler.GetUserIdFromHttpContext(HttpContext) ;
            var reponse = _blogRepository.ReplyComment(accountID,request);
            return StatusCode(reponse.StatusCode, reponse);
        }

    }
}
