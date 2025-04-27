using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bussiness_Object.DTO
{
    public class CheckInOutLogDTO
    {
        public Guid Id { get; set; }
        public Guid BookingId { get; set; }
        public string ActionType { get; set; }
        public string? Note { get; set; }
        public DateTime ActionTime { get; set; }
        public List<string>? Images { get; set; } // List image URL
    }
}
