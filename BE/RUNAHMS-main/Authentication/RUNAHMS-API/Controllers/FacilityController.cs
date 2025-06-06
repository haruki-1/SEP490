﻿using BusinessObject.DTO;
using BusinessObject.Entities;
using BusinessObject.Interfaces;
using BusinessObject.Shares;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FacilityController(IRepository<Facility> _facilityRepository) : ControllerBase
    {

        [HttpPost("add-facility")]
        public async Task<IActionResult> AddFacility([FromBody] List<AddFacilityDTO> request)
        {
            try
            {
                if (request == null) return BadRequest();
                var existingName = (await _facilityRepository.GetAllAsync()).Where(x => x.IsDeleted == false)
                                   .Select(x => x.Name)
                                   .ToList();

                foreach (var facility in request)
                {
                    if (existingName.Contains(facility.Name))
                    {
                        return Conflict(new { Message = "Facility Already Exists", Data = facility.Name });
                    }
                    else
                    {
                        Guid facilityID = Guid.NewGuid();
                        Facility addFacility = new Facility
                        {
                            Name = facility.Name,
                            Description = facility.Description,
                            CreateAt = DateTime.Now
                        };

                        await _facilityRepository.AddAsync(addFacility);
                        await _facilityRepository.SaveAsync();
                    }
                }

                return Ok(new { Message = "Add Facility Success" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPut("edit-facility")]
        public async Task<IActionResult> EditFacility([FromBody] UpdateFacilityDTO request)
        {
            try
            {
                if (request.FacilityID == Guid.Empty || request == null) return BadRequest();
                var getFacility = await _facilityRepository.Find(x => x.Id == request.FacilityID).FirstOrDefaultAsync();

                if (getFacility == null) return NotFound();

                getFacility.Name = request.Name ?? getFacility.Name;
                getFacility.Description = request.Description ?? getFacility.Description;
                getFacility.CreateAt = getFacility.CreateAt;
                getFacility.UpdateAt = DateTime.Now;
                await _facilityRepository.UpdateAsync(getFacility);
                await _facilityRepository.SaveAsync();
                return Ok(new { Message = "Update Facility Success" });

            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.ToString());
            }
        }

        [HttpGet("get-all")]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var listFacility = await _facilityRepository.Find(x => x.IsDeleted != true).ToListAsync();
                if (listFacility.Count == 0) return NotFound(new { Message = "Empty" });
                return Ok(listFacility);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.ToString());
            }
        }

        [HttpDelete("delete-facility")]
        public async Task<IActionResult> DeleteFacility([FromBody] DeleteListDTO request)
        {
            try
            {
                if (request == null) return BadRequest();
                var delete = await _facilityRepository
                   .Find(h => request.ID.Contains(h.Id))
                   .ToListAsync();

                if (!delete.Any()) return NotFound();

                foreach (var facility in delete)
                {

                    facility.IsDeleted = true;
                }
                await _facilityRepository.SaveAsync();
                return Ok(new { Message = "Delete Facility Success" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.ToString());
            }
        }

    }
}
