using Microsoft.EntityFrameworkCore;
using ZvitPlus.DAL.Context;
using ZvitPlus.DAL.Interfaces;
using ZvitPlus.DAL.Entities;

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

        public async Task<bool> DeleteAsync(Template entity)
        {
            return await DeleteByIdAsync(entity.Id);
        }

        public async Task<bool> DeleteByIdAsync(Guid id)
        {
            var rowsAffected = await context.Templates.Where(x => x.Id == id).ExecuteDeleteAsync();
            return rowsAffected > 0;
        }

        public async Task<IEnumerable<Template>> GetPaginated(int page, int itemsPerPage)
        {
            return await context.Templates
                .Skip((page - 1) * itemsPerPage)
                .Take(itemsPerPage)
                .ToListAsync();
        }

        public async Task<Template?> GetByIdAsync(Guid id)
        {
            return await context.Templates.FindAsync(id);
        }

        public async Task<IEnumerable<Template>> GetByNameAsync(string name)
        {
            return await context.Templates.Where(x => x.Name == name).ToListAsync();
        }

        public async Task<bool> UpdateAsync(Template entity)
        {
            var rowsAffected = await context.Templates
                .Where(x => x.Id == entity.Id)
                .ExecuteUpdateAsync(s => s
                    .SetProperty(x => x.Name, entity.Name)
                    .SetProperty(x => x.Type, entity.Type)
                    .SetProperty(x => x.LocalPath, entity.LocalPath)
                    .SetProperty(x => x.IsPrivate, entity.IsPrivate)
                    .SetProperty(x => x.CreatedAt, entity.CreatedAt)
                    .SetProperty(x => x.UpdatedAt, entity.UpdatedAt)
                    .SetProperty(x => x.AuthorId, entity.AuthorId)
                    .SetProperty(x => x.Author, entity.Author)
                    .SetProperty(x => x.Reports, entity.Reports));
            return rowsAffected > 0;
        }
    }
}
