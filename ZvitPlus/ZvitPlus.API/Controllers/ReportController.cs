using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ZvitPlus.BLL.DTOs.Requests;
using ZvitPlus.BLL.Interfaces;

namespace ZvitPlus.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReportController(IReportService reportService) : ControllerBase
    {
        [HttpPost]
        [Authorize(Roles = "User,Moderator,Administrator")]
        public async Task<IActionResult> PostAsync([FromBody] ReportCreateDTO dto)
        {
            var result = await reportService.AddAsync(dto);
            return Ok(result);
        }

        [HttpGet("{id:guid}")]
        [Authorize(Roles = "Moderator,Administrator")]
        public async Task<IActionResult> GetByIdAsync(Guid id)
        {
            var result = await reportService.GetByIdAsync(id);
            return Ok(result);
        }

        [HttpGet("{page:int}/{itemsPerPage:int}")]
        //AllRoles
        public async Task<IActionResult> GetPaginatedAsync(int page, int itemsPerPage)
        {
            var result = await reportService.GetPaginatedAsync(page, itemsPerPage);
            return Ok(result);
        }

        [HttpGet("{name}")]
        //AllRoles
        public async Task<IActionResult> GetByNameAsync(string name)
        {
            var result = await reportService.GetByNameAsync(name);
            return Ok(result);
        }

        [HttpPatch("{id:guid}")]
        [Authorize(Policy = "CanPatchReport")]
        public async Task<IActionResult> PatchAsync(Guid id, [FromBody] ReportUpdateDTO dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            dto.Id = id;
            var result = await reportService.UpdateAsync(dto);
            return Ok(result);
        }

        [HttpDelete("{id:guid}")]
        [Authorize(Policy = "CanDeleteReport")]
        public async Task<IActionResult> DeleteAsync(Guid id)
        {
            await reportService.DeleteAsync(id);
            return Ok();
        }
    }
}
