using Microsoft.AspNetCore.Mvc;
using ZvitPlus.BLL.DTOs.Requests;
using ZvitPlus.BLL.Interfaces;

namespace ZvitPlus.API.Controllers
{
    [Route("api/[controller]")]
    public class AuthenticationController(IAuthenticationService authService) : ControllerBase
    {
        [HttpPost("login")]
        public async Task<IActionResult> LoginAsync([FromBody] AuthRequestDTO dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await authService.VerifyAsync(dto.Login, dto.Password);
            return Ok(result);
        }
    }
}
