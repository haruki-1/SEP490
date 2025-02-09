namespace Business_Object.DTO.Response
{
    public class ReplyCommentResponse
    {
        public int CommentID { get; set; }
        public string Description { get; set; }
        public string UserComment { get; set; }

        public int ReplyID { get; set; }
        public string Content { get; set; }  
        public string UserReply { get; set; }  
    }

}
