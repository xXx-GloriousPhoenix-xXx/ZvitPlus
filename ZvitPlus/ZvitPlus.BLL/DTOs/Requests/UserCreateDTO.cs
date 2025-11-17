using ZvitPlus.BLL.Interfaces.DTOs;

namespace ZvitPlus.BLL.DTOs.Requests
{
    public class UserCreateDTO : ICreateDTO, IUserDTO
    {
        public required string Email { get; set; }
        public required string Login { get; set; }
        public required string Password { get; set; }
    }
}
