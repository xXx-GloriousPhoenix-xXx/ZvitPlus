using System.ComponentModel.DataAnnotations;
using ZvitPlus.BLL.Interfaces.DTOs;
namespace ZvitPlus.BLL.DTOs.Requests
{
    public class RegisterDTO : IAuthDTO
    {
        [Required]
        public required string Login { get; set; }

        [Required]
        public required string Password { get; set; }

        [Required]
        [EmailAddress]
        public required string Email { get; set; }
    }
}
