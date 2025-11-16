using Microsoft.EntityFrameworkCore;
using ZvitPlus.DAL.Context;
using ZvitPlus.DAL.Interfaces;
using ZvitPlus.Domain.Entities;

namespace ZvitPlus.DAL.Repository
{
    public class TemplateRepository(ZvitPlusDbContext context) : ITemplateRepository
    {
        private readonly ZvitPlusDbContext context = context;

        public async Task AddAsync(Template entity)
        {
            await context.Templates.AddAsync(entity);
            await context.SaveChangesAsync();
        }

        public async Task DeleteAsync(Template entity)
        {
            await DeleteByIdAsync(entity.Id);
        }

        public async Task DeleteByIdAsync(Guid id)
        {
            await context.Templates.Where(x => x.Id == id).ExecuteDeleteAsync();
        }

        public async Task<IEnumerable<Template>> GetAllAsync()
        {
            return await context.Templates.ToListAsync();
        }

        public async Task<Template?> GetByIdAsync(Guid id)
        {
            return await context.Templates.FindAsync(id);
        }

        public async Task<IEnumerable<Template>> GetByNameAsync(string name)
        {
            return await context.Templates.Where(x => x.Name == name).ToListAsync();
        }

        public async Task UpdateAsync(Template entity)
        {
            await context.Templates
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
        }
    }
}
