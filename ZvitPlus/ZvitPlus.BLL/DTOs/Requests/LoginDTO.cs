using System.ComponentModel.DataAnnotations;
using ZvitPlus.BLL.Interfaces.DTOs;

namespace ZvitPlus.BLL.DTOs.Requests
{
    public class LoginDTO : IAuthDTO
    {
        [Required]
        public required string Identifier { get; set; }

        [Required]
        public required string Password { get; set; }
    }
}
