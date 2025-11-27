using Microsoft.AspNetCore.Mvc;
using ZvitPlus.BLL.DTOs.Requests;
using ZvitPlus.BLL.Interfaces;

namespace ZvitPlus.API.Controllers
{
    [Route("api/templates")]
    [ApiController]
    public class TemplateController(ITemplateService templateService) : ControllerBase
    {
        [HttpPost]
        //[Authorize(Roles = "User,Moderator,Administrator")]
        public async Task<IActionResult> PostAsync([FromForm] TemplateCreateDTO dto)
        {
            var result = await templateService.AddAsync(dto);
            return Ok(result);
        }

        [HttpGet("{id:guid}")]
        //[Authorize(Roles = "Moderator,Administrator")]
        public async Task<IActionResult> GetByIdAsync(Guid id)
        {
            var result = await templateService.GetByIdAsync(id);
            return Ok(result);
        }

        [HttpGet("{page:int}/{itemsPerPage:int}")]
        //AllRoles
        public async Task<IActionResult> GetPaginatedAsync(int page = 1, int itemsPerPage = 10)
        {
            var result = await templateService.GetPaginatedAsync(page, itemsPerPage);
            return Ok(result);
        }

        [HttpGet("name/{name}")]
        //AllRoles
        public async Task<IActionResult> GetByNameAsync(string name)
        {
            var result = await templateService.GetByNameAsync(name);
            return Ok(result);
        }

        [HttpPatch("{id:guid}")]
        //[Authorize(Policy = "CanPatchTemplate")]
        public async Task<IActionResult> PatchAsync(Guid id, [FromForm] TemplateUpdateDTO dto)
        {
            var result = await templateService.UpdateAsync(id, dto);
            return Ok(result);
        }

        [HttpDelete("{id:guid}")]
        //[Authorize(Policy = "CanDeleteTemplate")]
        public async Task<IActionResult> DeleteAsync(Guid id)
        {
            await templateService.DeleteAsync(id);
            return NoContent();
        }
    }
}
