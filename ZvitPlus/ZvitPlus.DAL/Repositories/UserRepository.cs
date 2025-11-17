using Microsoft.EntityFrameworkCore;
using ZvitPlus.DAL.Context;
using ZvitPlus.DAL.Interfaces;
using ZvitPlus.DAL.Entities;

namespace ZvitPlus.DAL.Repository
{
    public class UserRepository(ZvitPlusDbContext context) : IUserRepository
    {
        private readonly ZvitPlusDbContext context = context;

        public async Task<Guid?> AddAsync(User entity)
        {
            await context.Users.AddAsync(entity);
            var rowsAffected = await context.SaveChangesAsync();
            return rowsAffected > 0 ? entity.Id : null;
        }

        public async Task<bool> DeleteAsync(User entity)
        {
            return await DeleteByIdAsync(entity.Id);
        }

        public async Task<bool> DeleteByIdAsync(Guid id)
        {
            var rowsAffected = await context.Users.Where(x => x.Id == id).ExecuteDeleteAsync();
            return rowsAffected > 0;
        }

        public async Task<IEnumerable<User>> GetPaginated(int page, int itemsPerPage)
        {
            return await context.Users
                .Skip((page - 1) * itemsPerPage)
                .Take(itemsPerPage)
                .ToListAsync();
        }

        public async Task<User?> GetByIdAsync(Guid id)
        {
            return await context.Users.FindAsync(id);
        }

        public async Task<User?> GetByLoginAsync(string login)
        {
            return await context.Users.SingleOrDefaultAsync(x => x.Login == login);
        }

        public async Task<bool> UpdateAsync(User entity)
        {
            var rowsAffected = await context.Users
                .Where(x => x.Id == entity.Id)
                .ExecuteUpdateAsync(s => s
                    .SetProperty(x => x.Login, entity.Login)
                    .SetProperty(x => x.Email, entity.Email)
                    .SetProperty(x => x.PasswordHash, entity.PasswordHash)
                    .SetProperty(x => x.Templates, entity.Templates)
                    .SetProperty(x => x.Reports, entity.Reports));
            return rowsAffected > 0;
        }
    }
}
