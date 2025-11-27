using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ZvitPlus.BLL.DTOs.Requests;
using ZvitPlus.BLL.Interfaces;

namespace ZvitPlus.API.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UserController(IUserService userService) : ControllerBase
    {
        [HttpPost]
        //[Authorize(Roles = "Moderator,Administrator")]
        public async Task<IActionResult> PostAsync([FromForm] UserCreateDTO dto)
        {
            var result = await userService.AddAsync(dto);
            return Ok(result);
        }

        [HttpGet("{id:guid}")]
        //[Authorize(Roles = "Moderator,Administrator")]
        public async Task<IActionResult> GetByIdAsync(Guid id)
        {
            var result = await userService.GetByIdAsync(id);
            return Ok(result);
        }

        [HttpGet("{page:int}/{itemsPerPage:int}")]
        //[Authorize(Roles = "Moderator,Administrator")]
        public async Task<IActionResult> GetPaginatedAsync(int page = 1, int itemsPerPage = 10)
        {
            var result = await userService.GetPaginatedAsync(page, itemsPerPage);
            return Ok(result);
        }

        [HttpGet("{identifier}")]
        //[Authorize(Roles = "Moderator,Administrator")]
        public async Task<IActionResult> GetByLogin(string identifier)
        {
            var result = identifier.Contains('@')
                ? await userService.GetByEmailAsync(identifier)
                : await userService.GetByLoginAsync(identifier);
            return Ok(result);
        }

        [HttpPatch("{id:guid}")]
        //[Authorize(Roles = "Moderator,Administrator")]
        public async Task<IActionResult> PatchAsync(Guid id, [FromForm] UserUpdateDTO dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await userService.UpdateAsync(id, dto);
            return Ok(result);
        }

        [HttpDelete("{id:guid}")]
        //[Authorize(Policy = "CanDeleteUser")]
        public async Task<IActionResult> DeleteAsync(Guid id)
        {
            await userService.DeleteAsync(id);
            return NoContent();
        }
    }
}
