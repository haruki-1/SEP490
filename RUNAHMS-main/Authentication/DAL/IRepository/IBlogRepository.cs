using Business_Object.DTO.Request;
using Business_Object.Model;
using GraduationAPI_EPOSHBOOKING.Model;
using Microsoft.AspNetCore.Http;

namespace GraduationAPI_EPOSHBOOKING.IRepository
{
    public interface IBlogRepository
    {
        public ResponseMessage GetAllBlogs();
        public ResponseMessage GetBlogDetailById(int blogId);
        public ResponseMessage GetBlogsByAccountId(int accountId);
        public ResponseMessage CreateBlog(Blog blog, int accountId, List<IFormFile> image);
        public ResponseMessage DeleteBlog(int blogId);
        public ResponseMessage CommentBlog(int blogId, int accountId, string description);
        public ResponseMessage ReplyComment(int acocuntID,ReplyCommentDTO request);
        public ResponseMessage GetReplyByComment(int commentID);

    }
}
