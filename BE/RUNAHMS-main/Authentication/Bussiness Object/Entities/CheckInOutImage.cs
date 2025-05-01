using BusinessObject.Common;
using BusinessObject.Entities;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BusinessObject.Entities
{
    [Table("CheckInOutImages")]
    public class CheckInOutImage : BaseEntity<Guid>
    {
        [MaxLength(255)]
        public string ImageUrl { get; set; }
        public Guid LogId { get; set; }

        [ForeignKey("LogId")]
        public bool IsDeleted { get; set; } = false;
        public CheckInOutLog Log { get; set; }
    }
}