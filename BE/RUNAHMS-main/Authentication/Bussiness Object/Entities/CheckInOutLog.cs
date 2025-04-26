using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using BusinessObject.Common;

namespace BusinessObject.Entities
{
    [Table("CheckInOutLogs")]
    public class CheckInOutLog
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public Guid BookingId { get; set; }
        public string ActionType { get; set; } = "";
        public string? Note { get; set; }
        public DateTime ActionTime { get; set; } = DateTime.Now;
        public bool IsDeleted { get; set; } = false;
        public ICollection<CheckInOutImage>? Images { get; set; }
    }
}