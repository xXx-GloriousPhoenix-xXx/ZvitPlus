using ZvitPlus.BLL.DTOs.Requests;
using ZvitPlus.BLL.DTOs.Responses;

namespace ZvitPlus.BLL.Interfaces
{
    public interface IAuthenticationService
    {
        Task<AuthTokenDTO> LoginAsync(LoginDTO dto);
        Task<UserReadDTO> RegisterAsync(RegisterDTO dto);
    }
}
