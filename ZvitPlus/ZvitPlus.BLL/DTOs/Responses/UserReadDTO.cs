using System.Text.Json.Serialization;
using ZvitPlus.BLL.Helpers;
using ZvitPlus.BLL.Interfaces.DTOs;
using ZvitPlus.DAL.Enums;

namespace ZvitPlus.BLL.DTOs.Responses
{
    public class UserReadDTO : IReadDTO, IUserDTO
    {
        public Guid Id { get; set; }
        public required string Email { get; set; }
        public required string Login { get; set; }

        [JsonConverter(typeof(UserRoleConverter))]
        public required UserRole Role { get; set; }
        public required bool IsBanned { get; set; }
    }
}
