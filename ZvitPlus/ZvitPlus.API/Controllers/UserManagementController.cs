using Microsoft.AspNetCore.Mvc;
using ZvitPlus.BLL.Interfaces;
using ZvitPlus.DAL.Enums;

namespace ZvitPlus.API.Controllers
{
    //[Authorize(Roles = "Administrator")]
    [Route("api/management")]
    [ApiController]
    public class UserManagementController(IUserManagementService userManagementService) : ControllerBase
    {
        [HttpPost("{userId:guid}/role/{role}")]
        public async Task<IActionResult> GrantRoleAsync(Guid userId, UserRole role)
        {
            var result = await userManagementService.GrantRoleAsync(userId, role);
            return Ok(result);
        }

        [HttpPost("{userId:guid}/ban/{ban:bool}")]
        public async Task<IActionResult> BanUserAsync(Guid userId, bool ban)
        {
            var result = await userManagementService.BanUserAsync(userId, ban);
            return Ok(result);
        }
    }
}
