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
    [Table("Payment")]
    public class Payment
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int PaymentID {  get; set; }
        public string PaymentMethod {  get; set; }

        [ForeignKey("BookingID")]
        public Booking booking { get; set; }
    }
}
