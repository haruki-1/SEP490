using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business_Object.DTO.Response
{
    public class GetReplyCommentReponse
    {
       public string avatar { get; set; }
       public String FullName {  get; set; }
       public String Content { get; set; }
       public DateTime ReplyDate { get; set; }
    }
}
