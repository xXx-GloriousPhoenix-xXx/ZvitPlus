using ZvitPlus.BLL.Interfaces.DTOs;

namespace ZvitPlus.BLL.DTOs.Requests
{
    public class UserUpdateDTO : IUpdateDTO, IUserDTO
    {
        public Guid Id { get; set; }
        public string? Password { get; set; }
    }
}
