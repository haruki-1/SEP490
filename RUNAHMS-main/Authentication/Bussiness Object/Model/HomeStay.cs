using System.Collections;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace GraduationAPI_EPOSHBOOKING.Model
{
    [Table("HomeStay")]
    public class HomeStay
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int HomeStayID { get; set; }
        public String MainImage { get; set; }
        public String Name { get; set; }
        public int OpenedIn { get; set; }
        public String Description { get; set; }

        public int HomeStayStandar { get; set; }
        
        public bool Status { get; set;}

        [ForeignKey("AccountID")]
        public Account Account { get; set; }
        
        public ICollection<HomeStayImage>? HomeStayImages { get; set; }
        public ICollection<HomeStayService>? HomeStayServices { get; set; }
        public ICollection<FeedBack>? feedBacks { get; set; }



    }
}
