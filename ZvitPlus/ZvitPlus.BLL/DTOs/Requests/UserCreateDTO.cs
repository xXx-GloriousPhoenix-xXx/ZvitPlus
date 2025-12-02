using System.ComponentModel.DataAnnotations;
using ZvitPlus.BLL.Interfaces.DTOs;
using ZvitPlus.DAL.Enums;

namespace ZvitPlus.BLL.DTOs.Requests
{
    public class UserCreateDTO : ICreateDTO, IUserDTO
    {
        [Required]
        public required string Email { get; set; }

        [Required]
        public required string Login { get; set; }

        [Required]
        public required string Password { get; set; }

        [Required]
        public required UserRole Role { get; set; }
    }
}
