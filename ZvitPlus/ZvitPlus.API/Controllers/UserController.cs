using Microsoft.AspNetCore.Mvc;
using ZvitPlus.BLL.DTOs.Requests;
using ZvitPlus.BLL.Interfaces;
using ZvitPlus.BLL.Services;

namespace ZvitPlus.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController(IUserService userService) : ControllerBase
    {
        [HttpPost]
        public async Task<IActionResult> PostAsync([FromBody] UserCreateDTO dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await userService.AddAsync(dto);
            return Ok(result);
        }

        [HttpGet("{id:guid}")]
        public async Task<IActionResult> GetAsync(Guid id)
        {
            var result = await userService.GetByIdAsync(id);
            return Ok(result);
        }

        [HttpGet("{page:int}/{itemsPerPage:int}")]
        public async Task<IActionResult> GetPaginatedAsync(int page, int itemsPerPage)
        {
            var result = await userService.GetPaginatedAsync(page, itemsPerPage);
            return Ok(result);
        }

        [HttpPatch("{id:guid}")]
        public async Task<IActionResult> PatchAsync(Guid id, [FromBody] UserUpdateDTO dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            dto.Id = id;
            var result = await userService.UpdateAsync(dto);
            return Ok(result);
        }

        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> DeleteAsync(Guid id)
        {
            await userService.DeleteAsync(id);
            return Ok();
        }
    }
}
