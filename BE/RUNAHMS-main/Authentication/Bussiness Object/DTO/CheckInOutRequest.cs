using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;

namespace BusinessObject.DTO
{
    public class CheckInOutRequest
    {
        public Guid BookingId { get; set; }
        public string ActionType { get; set; } = "";
        public string? Note { get; set; }
        public List<IFormFile>? Images { get; set; }
    }
}