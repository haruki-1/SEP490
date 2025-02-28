using System;
using System.ComponentModel.DataAnnotations;

namespace Business_Object.DTO.Request
{
    
    public class ReplyCommentDTO
    {
        
        public int CommentID { get; set; }

        
        public string Content { get; set; }

        
        public DateTime ReplyDate { get; set; } = DateTime.Now;
    }
}
