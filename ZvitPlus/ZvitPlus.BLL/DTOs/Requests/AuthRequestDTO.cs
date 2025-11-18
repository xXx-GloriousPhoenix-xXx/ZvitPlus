using ZvitPlus.BLL.Interfaces.DTOs;

namespace ZvitPlus.BLL.DTOs.Requests
{
    public class AuthRequestDTO : IAuthDTO
    {
        public required string Login { get; set; }
        public required string Password { get; set; }
    }
}
