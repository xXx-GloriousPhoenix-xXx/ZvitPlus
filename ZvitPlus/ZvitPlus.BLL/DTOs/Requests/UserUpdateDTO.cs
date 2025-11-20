using System.Text.Json.Serialization;
using ZvitPlus.BLL.Interfaces.DTOs;
using ZvitPlus.DAL.Enums;

namespace ZvitPlus.BLL.DTOs.Requests
{
    public class UserUpdateDTO : IUpdateDTO, IUserDTO
    {
        [JsonIgnore]
        public Guid Id { get; set; }
        public string? Login { get; set; }
        public string? Password { get; set; }
        public UserRole? Role { get; set; }
        public bool IsBanned { get; set; }
    }
}
