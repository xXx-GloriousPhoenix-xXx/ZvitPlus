using ZvitPlus.BLL.Interfaces.DTOs;

namespace ZvitPlus.BLL.DTOs.Responses
{
    public class AuthResponseDTO : IAuthDTO
    {
        public Guid UserId { get; set; }
        public required string Token { get; set; }
    }
}
