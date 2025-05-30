﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessObject.Entities
{
    [Table("HomestayAmenity")]
    public class HomestayAmenity
    {
        public Guid AmenityId { get; set; }
        [ForeignKey("AmenityId")]
        public Amenity Amenity { get; set; }
        [ForeignKey("HomeStayID")]
        public Guid HomeStayID {  get; set; }
        public HomeStay HomeStay { get; set; }
        public bool isDeleted { get; set; } = false;
    }
}
