using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;
using System.Linq.Expressions;
using ZvitPlus.DAL.Context;
using ZvitPlus.DAL.Entities;
using ZvitPlus.DAL.Enums;
using ZvitPlus.DAL.Interfaces;
using ZvitPlus.DAL.Repositories;

namespace ZvitPlus.DAL.Repository
{
    public class TemplateRepository(ZvitPlusDbContext context) : ITemplateRepository
    {
        private readonly ZvitPlusDbContext context = context;

        public async Task<Guid?> AddAsync(Template entity)
        {
            await context.Templates.AddAsync(entity);
            var rowsAffected = await context.SaveChangesAsync();
            return rowsAffected > 0 ? entity.Id : null;
        }

        public async Task<bool> DeleteAsync(Guid id)
        {
            var rowsAffected = await context.Templates.Where(x => x.Id == id).ExecuteDeleteAsync();
            return rowsAffected > 0;
        }

        public async Task<IEnumerable<Template>> GetPaginatedAsync(
            int page, int itemsPerPage,
            string search,
            TemplateType? type
            )
        {
            return await context.Templates
                .AsNoTracking()
                .Where(x =>
                    string.IsNullOrEmpty(search) ||
                    x.Name.Contains(search) ||
                    x.OriginalFileName.Contains(search) ||
                    x.Author!.Login.Contains(search)
                )
                .Where(x => type == null || x.Type == type)
                .Skip((page - 1) * itemsPerPage)
                .Take(itemsPerPage)
                .ToListAsync();
        }

        public async Task<Template?> GetByIdAsync(Guid id)
        {
            return await context.Templates
                .AsNoTracking()
                .SingleOrDefaultAsync(x => x.Id == id);
        }

        public async Task<IEnumerable<Template>> GetByNameAsync(string name)
        {
            return await context.Templates
                .AsNoTracking()
                .Where(x => x.Name == name)
                .ToListAsync();
        }

        public async Task<bool> UpdateAsync(Template entity)
        {
            var query = context.Templates.Where(x => x.Id == entity.Id);

            Expression<Func<SetPropertyCalls<Template>, SetPropertyCalls<Template>>> expr = s => s;

            if (entity.Name != null)
                expr = Helper.Combine(expr, s => s.SetProperty(x => x.Name, entity.Name));

            if (entity.Name != null)
                expr = Helper.Combine(expr, s => s.SetProperty(x => x.OriginalFileName, entity.OriginalFileName));

            if (entity.FileSize > 0)
                expr = Helper.Combine(expr, s => s.SetProperty(x => x.FileSize, entity.FileSize));

            expr = Helper.Combine(expr, s => s.SetProperty(x => x.UpdatedAt, entity.UpdatedAt));
            expr = Helper.Combine(expr, s => s.SetProperty(x => x.IsPrivate, entity.IsPrivate));
            expr = Helper.Combine(expr, s => s.SetProperty(x => x.LocalPath, entity.LocalPath));


            var rowsAffected = await query.ExecuteUpdateAsync(expr);

            return rowsAffected > 0;
        }

        public async Task<Template?> GetByIdWithAuthorAsync(Guid id)
        {
            return await context.Templates
                .Include(t => t.Author)
                .FirstOrDefaultAsync(t => t.Id == id);
        }
    }
}
