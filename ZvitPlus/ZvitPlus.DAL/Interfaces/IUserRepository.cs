using ZvitPlus.Domain.Entities;

namespace ZvitPlus.DAL.Interfaces
{
    public interface IUserRepository : IBasicCRUD<User>
    {
        public Task<User?> GetByLoginAsync(string login);
    }
}
