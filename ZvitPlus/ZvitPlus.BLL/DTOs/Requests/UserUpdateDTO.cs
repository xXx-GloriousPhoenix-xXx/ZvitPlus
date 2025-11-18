using System.Text.Json.Serialization;
using ZvitPlus.BLL.Interfaces.DTOs;

namespace ZvitPlus.BLL.DTOs.Requests
{
    public class UserUpdateDTO : IUpdateDTO, IUserDTO
    {
        [JsonIgnore]
        public Guid Id { get; set; }
        public string? Login { get; set; }
        public string? Password { get; set; }
    }
}
