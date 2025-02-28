using System.ComponentModel.DataAnnotations;

namespace Business_Object.DTO.Request
{
    
    public class RegisterDTO
    {
        
        public string Email { get; set; }

        
        public string Password { get; set; }

        
       public string FullName { get; set; }

        
        public string Phone { get; set; }
    }
}
