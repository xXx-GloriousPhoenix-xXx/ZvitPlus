using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using ZvitPlus.API.Extensions;
using ZvitPlus.BLL.DTOs.Requests;
using ZvitPlus.BLL.Interfaces;
using ZvitPlus.DAL.Enums;

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
        public async Task<IActionResult> GetByIdAsync(Guid id)
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

        [HttpGet("{identifier}")]
        public async Task<IActionResult> GetByLogin(string identifier)
        {
            var result = identifier.Contains('@')
                ? await userService.GetByEmailAsync(identifier)
                : await userService.GetByLoginAsync(identifier);
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
        [Authorize(Roles = "Administrator,Moderator,User")]
        public async Task<IActionResult> DeleteAsync(Guid id)
        {
            var currentUser = HttpContext.GetCurrentUser();

            if (currentUser.Role == UserRole.Administrator && currentUser.Id == id)
                return Forbid("You cannot delete your own account as an Admin.");

            var userToDelete = await userService.GetByIdAsync(id);

            switch (currentUser.Role)
            {
                case UserRole.Moderator:
                    if (userToDelete.Role >= UserRole.Administrator)
                        return Forbid("Moderators cannot delete Admin accounts");
                    if (userToDelete.Role == UserRole.Moderator && userToDelete.Id != id)
                        return Forbid("Moderators cannot delete other Moderator accounts");
                    break;

                case UserRole.User:
                    if (currentUser.Id != id)
                        return Forbid("Users can only delete their own account");
                    break;
            }

            await userService.DeleteAsync(id);
            return NoContent();
        }
    }
}

// TODO:
// Complete role dependency
// Add Ban functionality
