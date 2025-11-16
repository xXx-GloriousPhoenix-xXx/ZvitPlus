using Microsoft.EntityFrameworkCore;
using ZvitPlus.DAL.Context;
using ZvitPlus.DAL.Interfaces;
using ZvitPlus.Domain.Entities;

namespace ZvitPlus.DAL.Repository
{
    public class ReportRepository(ZvitPlusDbContext context) : IReportRepository
    {
        private readonly ZvitPlusDbContext context = context;

        public async Task AddAsync(Report entity)
        {
            await context.Reports.AddAsync(entity);
        }

        public async Task DeleteAsync(Report entity)
        {
            await DeleteByIdAsync(entity.Id);
        }

        public async Task DeleteByIdAsync(Guid id)
        {
            await context.Reports.Where(x => x.Id == id).ExecuteDeleteAsync();
        }

        public async Task<IEnumerable<Report>> GetAllAsync()
        {
            return await context.Reports.ToListAsync();
        }

        public async Task<Report?> GetByIdAsync(Guid id)
        {
            return await context.Reports.FindAsync(id);
        }

        public async Task<IEnumerable<Report>> GetByNameAsync(string name)
        {
            return await context.Reports.Where(x => x.Name == name).ToListAsync();
        }

        public async Task UpdateAsync(Report entity)
        {
            await context.Reports
                .Where(x => x.Id == entity.Id)
                .ExecuteUpdateAsync(s => s
                    .SetProperty(x => x.Name, entity.Name)
                    .SetProperty(x => x.CreatedAt, entity.CreatedAt)
                    .SetProperty(x => x.UpdatedAt, entity.UpdatedAt)
                    .SetProperty(x => x.TemplateId, entity.TemplateId)
                    .SetProperty(x => x.Template, entity.Template)
                    .SetProperty(x => x.AuthorId, entity.AuthorId)
                    .SetProperty(x => x.Author, entity.Author));
        }
    }
}
