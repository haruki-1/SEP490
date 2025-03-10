using BusinessObject.DTO;
using BusinessObject.Entities;
using BusinessObject.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CalendarController(IRepository<Calendar> _calendarRepository, IRepository<HomeStay> _homeStayRepository) : ControllerBase
    {
        //[HttpGet]
        //public async Task<IActionResult> GetAll()
        //{
        //    var calendars = await _calendarRepository.GetAllAsync();
        //    return Ok(calendars);
        //}

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var calendar = await _calendarRepository.GetByIdAsync(id);
            if (calendar == null)
                return NotFound(new { Message = "Calendar not found" });

            return Ok(calendar);
        }

        [HttpGet("homestay/{homeStayId}")]
        public async Task<IActionResult> GetByHomeStayId(Guid homeStayId)
        {
            var calendars = await _calendarRepository.GetAllAsync();

            calendars = calendars.Where(c => c.HomeStayID == homeStayId && !c.isDeleted);

            if (!calendars.Any())
                return NotFound(new { Message = "No calendars found for this HomeStay" });

            var sortedCalendars = calendars.OrderBy(c => c.Date).ToList();

            return Ok(sortedCalendars);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] CalendarDTO dto)
        {
            var calendar = await _calendarRepository.GetByIdAsync(id);
            if (calendar == null)
                return NotFound(new { Message = "Calendar not found" });

            var homeStay = await _homeStayRepository.GetByIdAsync(dto.HomeStayID);
            if (homeStay == null)
                return BadRequest(new { Message = "Invalid HomeStayID" });

            calendar.Date = dto.Date;
            calendar.Price = dto.Price;
            calendar.HomeStay = homeStay;

            await _calendarRepository.UpdateAsync(calendar);
            await _calendarRepository.SaveAsync();

            return Ok(new { Message = "Calendar updated successfully!" });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> SoftDelete(Guid id)
        {
            var calendar = await _calendarRepository.GetByIdAsync(id);
            if (calendar == null)
                return NotFound(new { Message = "Calendar not found" });

            calendar.isDeleted = true;
            await _calendarRepository.UpdateAsync(calendar);
            await _calendarRepository.SaveAsync();

            return Ok(new { Message = "Calendar soft deleted!" });
        }
    }

}
