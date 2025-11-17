using Microsoft.EntityFrameworkCore;
using ZvitPlus.DAL.Context;
using ZvitPlus.DAL.Interfaces;
using ZvitPlus.DAL.Entities;

namespace ZvitPlus.DAL.Repository
{
    public class ReportRepository(ZvitPlusDbContext context) : IReportRepository
    {
        private readonly ZvitPlusDbContext context = context;

        public async Task<Guid?> AddAsync(Report entity)
        {
            await context.Reports.AddAsync(entity);
            var rowsAffected = await context.SaveChangesAsync();
            return rowsAffected > 0 ? entity.Id : null;
        }

        public async Task<bool> DeleteAsync(Report entity)
        {
            return await DeleteByIdAsync(entity.Id);
        }

        public async Task<bool> DeleteByIdAsync(Guid id)
        {
            var rowsAffected = await context.Reports.Where(x => x.Id == id).ExecuteDeleteAsync();
            return rowsAffected > 0;
        }

        public async Task<IEnumerable<Report>> GetPaginated(int page, int itemsPerPage)
        {
            return await context.Reports
                .Skip((page - 1) * itemsPerPage)
                .Take(itemsPerPage)
                .ToListAsync();
        }

        public async Task<Report?> GetByIdAsync(Guid id)
        {
            return await context.Reports.FindAsync(id);
        }

        public async Task<IEnumerable<Report>> GetByNameAsync(string name)
        {
            return await context.Reports.Where(x => x.Name == name).ToListAsync();
        }

        public async Task<bool> UpdateAsync(Report entity)
        {
            var rowsAffected = await context.Reports
                .Where(x => x.Id == entity.Id)
                .ExecuteUpdateAsync(s => s
                    .SetProperty(x => x.Name, entity.Name)
                    .SetProperty(x => x.IsPrivate, entity.IsPrivate)
                    .SetProperty(x => x.CreatedAt, entity.CreatedAt)
                    .SetProperty(x => x.UpdatedAt, entity.UpdatedAt)
                    .SetProperty(x => x.TemplateId, entity.TemplateId)
                    .SetProperty(x => x.Template, entity.Template)
                    .SetProperty(x => x.AuthorId, entity.AuthorId)
                    .SetProperty(x => x.Author, entity.Author));
            return rowsAffected > 0;
        }
    }
}
