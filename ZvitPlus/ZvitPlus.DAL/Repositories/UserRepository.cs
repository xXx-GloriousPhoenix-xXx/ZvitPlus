using Microsoft.EntityFrameworkCore;
using ZvitPlus.DAL.Context;
using ZvitPlus.DAL.Interfaces;
using ZvitPlus.DAL.Entities;
using ZvitPlus.DAL.Enums;

namespace ZvitPlus.DAL.Repositories
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

        public async Task<bool> DeleteAsync(Guid id)
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
            var entity = await context.Users.SingleOrDefaultAsync(x => x.Login == login);
            return entity;
        }

        public async Task<User?> GetByEmailAsync(string email)
        {
            var entity = await context.Users.SingleOrDefaultAsync(x => x.Email == email);
            return entity;
        }

        public async Task<bool> UpdateAsync(User entity)
        {
            var rowsAffected = await context.Users
                .Where(x => x.Id == entity.Id)
                .ExecuteUpdateAsync(s => s
                    .SetProperty(x => x.Login, entity.Login)
                    .SetProperty(x => x.Email, entity.Email)
                    .SetProperty(x => x.PasswordHash, entity.PasswordHash)
                    .SetProperty(x => x.IsBanned, entity.IsBanned)
                    .SetProperty(x => x.Templates, entity.Templates)
                    .SetProperty(x => x.Reports, entity.Reports));
            return rowsAffected > 0;
        }

        public async Task<bool> GrantRoleAsync(Guid userId, UserRole newRole)
        {
            var rowsAffected = await context.Users
                .Where(x => x.Id == userId)
                .ExecuteUpdateAsync(s => s
                    .SetProperty(x => x.Role, newRole));
            return rowsAffected > 0;
        }

        public async Task<bool> BanAsync(Guid userId, bool ban)
        {
            var rowsAffected = await context.Users
                .Where(x => x.Id == userId)
                .ExecuteUpdateAsync(s => s
                    .SetProperty(x => x.IsBanned, ban));
            return rowsAffected > 0;
        }
    }
}
