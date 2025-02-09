using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using GraduationAPI_EPOSHBOOKING.Model;

namespace Business_Object.Model
{
    [Table("ReplyComment")]
    public class ReplyComment
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ReplyID {  get; set; }
        public string Content {  get; set; }
       
        public DateTime ReplyDate {  get; set; }

        [ForeignKey("CommentID")]
        public CommentBlog commentBlog { get; set; }

        [ForeignKey("AccountID")]
        public Account Account { get; set; }
    }
}
