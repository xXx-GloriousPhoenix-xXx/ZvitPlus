using ZvitPlus.DAL.Entities;

namespace ZvitPlus.DAL.Interfaces
{
    public interface IUserRepository : IBasicCRUD<User>
    {
        public Task<User?> GetByLoginAsync(string login);
        public Task<User?> GetByEmailAsync(string login);
    }
}
