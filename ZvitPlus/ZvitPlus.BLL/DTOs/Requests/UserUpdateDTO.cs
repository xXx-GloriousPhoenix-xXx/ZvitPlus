using Microsoft.AspNetCore.Mvc.ModelBinding;
using System.Text.Json.Serialization;
using ZvitPlus.BLL.Interfaces.DTOs;
using ZvitPlus.DAL.Enums;

namespace ZvitPlus.BLL.DTOs.Requests
{
    public class UserUpdateDTO : IUpdateDTO, IUserDTO
    {
        public string? Password { get; set; }
        public UserRole? Role { get; set; }
        public bool? IsBanned { get; set; }
    }
}
