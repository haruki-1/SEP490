using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GraduationAPI_EPOSHBOOKING.Model
{
    [Table("HomeStaySubService")]
    public class HomeStaySubService
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int SubServiceID { get; set; }
        public String SubServiceName { get; set; }

        [ForeignKey("ServiceID")]
        public HomeStayService HomeStayService { get; set; }

    }
}
