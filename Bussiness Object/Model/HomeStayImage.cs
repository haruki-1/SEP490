using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GraduationAPI_EPOSHBOOKING.Model
{
    [Table("HomeStayImage")]
    public class HomeStayImage
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ImageID { get; set; }
        public String Title { get; set; }
        public String Image { get; set; }
        
        [ForeignKey("HomeStayID")]
        public HomeStay HomeStay { get; set; }

    }
}
