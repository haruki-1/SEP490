using BusinessObject.DTO;
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

    }
}
