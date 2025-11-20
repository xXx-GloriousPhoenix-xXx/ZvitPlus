using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ZvitPlus.BLL.DTOs.Requests;
using ZvitPlus.BLL.Interfaces;

namespace ZvitPlus.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TemplateController(ITemplateService templateService) : ControllerBase
    {
        [HttpPost]
        [Authorize(Roles = "User,Moderator,Administrator")]
        public async Task<IActionResult> PostAsync([FromBody] TemplateCreateDTO dto)
        {
            var result = await templateService.AddAsync(dto);
            return Ok(result);
        }

        [HttpGet("{id:guid}")]
        [Authorize(Roles = "Moderator,Administrator")]
        public async Task<IActionResult> GetByIdAsync(Guid id)
        {
            var result = await templateService.GetByIdAsync(id);
            return Ok(result);
        }

        [HttpGet("{page:int}/{itemsPerPage:int}")]
        //AllRoles
        public async Task<IActionResult> GetPaginatedAsync(int page, int itemsPerPage)
        {
            var result = await templateService.GetPaginatedAsync(page, itemsPerPage);
            return Ok(result);
        }

        [HttpGet("{name}")]
        //AllRoles
        public async Task<IActionResult> GetByNameAsync(string name)
        {
            var result = await templateService.GetByNameAsync(name);
            return Ok(result);
        }

        [HttpPatch("{id:guid}")]
        [Authorize(Policy = "CanPatchTemplate")]
        public async Task<IActionResult> PatchAsync(Guid id, [FromBody] TemplateUpdateDTO dto)
        {
            dto.Id = id;
            var result = await templateService.UpdateAsync(dto);
            return Ok(result);
        }

        [HttpDelete("{id:guid}")]
        [Authorize(Policy = "CanDeleteTemplate")]
        public async Task<IActionResult> DeleteAsync(Guid id)
        {
            await templateService.DeleteAsync(id);
            return NoContent();
        }
    }
}
