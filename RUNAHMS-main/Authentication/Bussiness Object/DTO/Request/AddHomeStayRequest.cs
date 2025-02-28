using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace Bussiness_Object.DTO.Request
{
    public class AddHomeStayRequest
    {
        public string Address { get; set; }
        public string City { get; set; } 
        public IFormFile MainImage { get; set; }
        public string Name {  get; set; }
        public int OpenedIn {  get; set; }
        public string Description { get; set; }
        public int HomeStayStandar {  get; set; }
        public Decimal Price {  get; set; }
        public bool Status = true;
        public List<IFormFile> Images { get; set; }
         public string Services { get; set; }

    }
}
