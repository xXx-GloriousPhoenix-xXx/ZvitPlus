using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;
using System.Linq.Expressions;
using ZvitPlus.DAL.Context;
using ZvitPlus.DAL.Entities;
using ZvitPlus.DAL.Enums;
using ZvitPlus.DAL.Interfaces;

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
                .AsNoTracking()
                .Skip((page - 1) * itemsPerPage)
                .Take(itemsPerPage)
                .ToListAsync();
        }

        public async Task<User?> GetByIdAsync(Guid id)
        {
            return await context.Users
                .AsNoTracking()
                .SingleOrDefaultAsync(x => x.Id == id);
        }

        public async Task<User?> GetByLoginAsync(string login)
        {
            var entity = await context.Users
                .AsNoTracking()
                .SingleOrDefaultAsync(x => x.Login == login);
            return entity;
        }

        public async Task<User?> GetByEmailAsync(string email)
        {
            var entity = await context.Users
                .AsNoTracking()
                .SingleOrDefaultAsync(x => x.Email == email);
            return entity;
        }

        public async Task<bool> UpdateAsync(User entity)
        {
            var query = context.Users.Where(x => x.Id == entity.Id);

            Expression<Func<SetPropertyCalls<User>, SetPropertyCalls<User>>> expr = s => s;

            if (entity.Login != null)
                expr = Helper.Combine(expr, s => s.SetProperty(x => x.Login, entity.Login));

            if (entity.Email != null)
                expr = Helper.Combine(expr, s => s.SetProperty(x => x.Email, entity.Email));

            if (entity.PasswordHash != null)
                expr = Helper.Combine(expr, s => s.SetProperty(x => x.PasswordHash, entity.PasswordHash));

            expr = Helper.Combine(expr, s => s.SetProperty(x => x.Role, entity.Role));
            expr = Helper.Combine(expr, s => s.SetProperty(x => x.IsBanned, entity.IsBanned));

            var rowsAffected = await query.ExecuteUpdateAsync(expr);

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
