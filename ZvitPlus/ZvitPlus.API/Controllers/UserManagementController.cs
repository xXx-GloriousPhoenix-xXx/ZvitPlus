using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ZvitPlus.BLL.Interfaces;
using ZvitPlus.DAL.Enums;

namespace ZvitPlus.API.Controllers
{
    [Authorize(Roles = "Administrator")]
    [Route("api/[controller]")]
    public class UserManagementController(IUserManagementService userManagementService) : ControllerBase
    {
        [HttpPatch("{userId:guid}/role")]
        public async Task<IActionResult> GrantRoleAsync(Guid userId, [FromQuery] UserRole role)
        {
            await userManagementService.GrantRoleAsync(userId, role);
            return NoContent();
        }

        [HttpPatch("{userId:guid}/ban")]
        public async Task<IActionResult> BanUserAsync(Guid userId, [FromQuery] bool ban)
        {
            await userManagementService.BanUserAsync(userId, ban);
            return NoContent();
        }
    }
}
