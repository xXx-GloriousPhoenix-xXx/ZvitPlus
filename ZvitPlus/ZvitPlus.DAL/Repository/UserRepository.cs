using Microsoft.EntityFrameworkCore;
using ZvitPlus.DAL.Context;
using ZvitPlus.DAL.Interfaces;
using ZvitPlus.Domain.Entities;

namespace ZvitPlus.DAL.Repository
{
    public class UserRepository(ZvitPlusDbContext context) : IUserRepository
    {
        private readonly ZvitPlusDbContext context = context;

        public async Task AddAsync(User entity)
        {
            await context.Users.AddAsync(entity);
            await context.SaveChangesAsync();
        }

        public async Task DeleteAsync(User entity)
        {
            await DeleteByIdAsync(entity.Id);
        }

        public async Task DeleteByIdAsync(Guid id)
        {
            await context.Users.Where(x => x.Id == id).ExecuteDeleteAsync();
        }

        public async Task<IEnumerable<User>> GetAllAsync()
        {
            return await context.Users.ToListAsync();
        }

        public async Task<User?> GetByIdAsync(Guid id)
        {
            return await context.Users.FindAsync(id);
        }

        public async Task<User?> GetByLoginAsync(string login)
        {
            return await context.Users.SingleOrDefaultAsync(x => x.Login == login);
        }

        public async Task UpdateAsync(User entity)
        {
            await context.Users
                .Where(x => x.Id == entity.Id)
                .ExecuteUpdateAsync(s => s
                    .SetProperty(x => x.Login, entity.Login)
                    .SetProperty(x => x.Email, entity.Email)
                    .SetProperty(x => x.PasswordHash, entity.PasswordHash)
                    .SetProperty(x => x.Templates, entity.Templates)
                    .SetProperty(x => x.Reports, entity.Reports));
            await context.SaveChangesAsync();
        }
    }
}
