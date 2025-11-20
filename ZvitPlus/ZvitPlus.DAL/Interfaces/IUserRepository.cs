using ZvitPlus.DAL.Entities;
using ZvitPlus.DAL.Enums;

namespace ZvitPlus.DAL.Interfaces
{
    public interface IUserRepository : IBasicCRUD<User>
    {
        Task<User?> GetByLoginAsync(string login);
        Task<User?> GetByEmailAsync(string login);
        Task<bool> GrantRoleAsync(Guid userId, UserRole newRole);
        Task<bool> BanAsync(Guid userId, bool ban);
    }
}
