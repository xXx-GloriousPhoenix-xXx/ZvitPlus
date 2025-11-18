using System.ComponentModel.DataAnnotations;
using ZvitPlus.BLL.Interfaces.DTOs;
namespace ZvitPlus.BLL.DTOs.Requests
{
    public class RegisterDTO : IAuthDTO
    {
        [Required]
        public string Login { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }
    }
}
