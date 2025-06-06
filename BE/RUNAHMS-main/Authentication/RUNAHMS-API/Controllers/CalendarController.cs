﻿using BusinessObject.DTO;
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
            try
            {
                var calendar = await _calendarRepository.GetByIdAsync(id);
                if (calendar == null)
                    return NotFound(new { Message = "Calendar not found" });

                return Ok(calendar);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.ToString());
            }
        }

        [HttpGet("homestay/{homeStayId}")]
        public async Task<IActionResult> GetByHomeStayId(Guid homeStayId)
        {
            try
            {
                if (homeStayId == Guid.Empty)
                {
                    return BadRequest();
                }
                var calendars = await _calendarRepository.GetAllAsync();

                calendars = calendars.Where(c => c.HomeStayID == homeStayId && !c.isDeleted);

                if (!calendars.Any())
                    return NotFound(new { Message = "No calendars found for this HomeStay" });

                var sortedCalendars = calendars.OrderBy(c => c.Date).ToList();

                return Ok(sortedCalendars);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.ToString());
            }
        }
        [HttpPost("create")]
        public async Task<IActionResult> Create([FromBody] List<CalendarDTO> calendarDTOs)
        {
            List<DateTime> CalendarAlready = new List<DateTime>();
            try
            {
                if (calendarDTOs == null || !calendarDTOs.Any())
                    return BadRequest(new { Message = "Invalid data" });

                var homeStayIds = calendarDTOs.Select(dto => dto.HomeStayID).Distinct().ToList();

                var existingCalendars = await _calendarRepository
                    .FindAsync(c => homeStayIds.Contains(c.HomeStay.Id));

                var calendarsToAdd = new List<Calendar>();

                foreach (var dto in calendarDTOs)
                {
                    var homeStay = await _homeStayRepository.GetByIdAsync(dto.HomeStayID);
                    if (homeStay == null)
                        return BadRequest(new { Message = $"HomeStay {dto.HomeStayID} not found" });

                    var existingCalendar = existingCalendars
                        .FirstOrDefault(c => c.HomeStay.Id == dto.HomeStayID && c.Date == dto.Date);

                    if (existingCalendar != null)
                    {
                        existingCalendar.Price = dto.Price;
                    }
                    else
                    {
                        calendarsToAdd.Add(new Calendar
                        {
                            Id = Guid.NewGuid(),
                            Date = dto.Date,
                            Price = dto.Price,
                            HomeStay = homeStay,
                            Booking = null,
                            isDeleted = false,
                            isBooked = false
                        });
                    }
                }

                if (calendarsToAdd.Any())
                    await _calendarRepository.AddRangeAsync(calendarsToAdd);

                await _calendarRepository.SaveAsync();

                return Ok(new { Message = "Calendars processed successfully!" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.ToString());
            }
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] CalendarDTO dto)
        {
            try
            {
                if (id == Guid.Empty)
                {
                    return BadRequest();
                }
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
            catch (Exception ex)
            {

                return StatusCode(500, ex.ToString());
            }
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> SoftDelete(Guid id)
        {
            try
            {
                if (id == Guid.Empty)
                {
                    return BadRequest();
                }
                var calendar = await _calendarRepository.GetByIdAsync(id);
                if (calendar == null)
                    return NotFound(new { Message = "Calendar not found" });

                calendar.isDeleted = true;
                await _calendarRepository.UpdateAsync(calendar);
                await _calendarRepository.SaveAsync();

                return Ok(new { Message = "Calendar soft deleted!" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.ToString());
            }

        }

    }

}
