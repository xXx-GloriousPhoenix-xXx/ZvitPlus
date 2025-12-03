using ZvitPlus.BLL.Interfaces.DTOs;

namespace ZvitPlus.BLL.DTOs.Responses
{
    public class AuthTokenDTO : IAuthDTO
    {
        public required UserReadDTO User { get; set; }
        public required string Token { get; set; }
    }
}
