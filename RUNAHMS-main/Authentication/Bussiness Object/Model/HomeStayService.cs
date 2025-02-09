using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GraduationAPI_EPOSHBOOKING.Model
{
    [Table("HomeStayService")]
    public class HomeStayService
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ServiceID { get; set; }
        public String Type { get; set; }

        [ForeignKey("HomeStayID")]
        public HomeStay HomeStay { get; set; }
        public ICollection<HomeStaySubService> HomeStaySubServices { get; set; }
    }
}
