using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace BusinessObject.Entities
{
    [Table("CheckInOutImages")]
    public class CheckInOutImage
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public Guid LogId { get; set; }
        public string ImageUrl { get; set; } = "";
        public bool IsDeleted { get; set; } = false;
        public CheckInOutLog? Log { get; set; }
    }
}