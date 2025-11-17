using ZvitPlus.BLL.DTOs.Responses;

namespace ZvitPlus.BLL.Interfaces
{
    public interface IAuthenticationService
    {
        Task<AuthResponseDTO> VerifyAsync(string login, string password);
    }
}
