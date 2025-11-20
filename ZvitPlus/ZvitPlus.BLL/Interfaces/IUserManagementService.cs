using ZvitPlus.BLL.DTOs.Requests;
using ZvitPlus.BLL.DTOs.Responses;
using ZvitPlus.DAL.Enums;

namespace ZvitPlus.BLL.Interfaces
{
    public interface IUserManagementService
    {
        Task<UserReadDTO> GrantRoleAsync(Guid userId, UserRole role);
        Task<UserReadDTO> BanUserAsync(Guid userId, bool ban);
    }
}
