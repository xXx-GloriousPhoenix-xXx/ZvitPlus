using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;
using System.Linq.Expressions;
using ZvitPlus.DAL.Context;
using ZvitPlus.DAL.Entities;
using ZvitPlus.DAL.Interfaces;
using ZvitPlus.DAL.Repositories;

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

        public async Task<bool> DeleteAsync(Guid id)
        {
            var rowsAffected = await context.Reports.Where(x => x.Id == id).ExecuteDeleteAsync();
            return rowsAffected > 0;
        }

        public async Task<IEnumerable<Report>> GetPaginated(int page, int itemsPerPage)
        {
            return await context.Reports
                .AsNoTracking()
                .Skip((page - 1) * itemsPerPage)
                .Take(itemsPerPage)
                .ToListAsync();
        }

        public async Task<Report?> GetByIdAsync(Guid id)
        {
            return await context.Reports
                .AsNoTracking()
                .SingleOrDefaultAsync(x => x.Id == id);
        }

        public async Task<IEnumerable<Report>> GetByNameAsync(string name)
        {
            return await context.Reports
                .AsNoTracking()
                .Where(x => x.Name == name)
                .ToListAsync();
        }

        public async Task<bool> UpdateAsync(Report entity)
        {
            var query = context.Reports.Where(x => x.Id == entity.Id);

            Expression<Func<SetPropertyCalls<Report>, SetPropertyCalls<Report>>> expr = s => s;

            if (entity.Name != null)
                expr = Helper.Combine(expr, s => s.SetProperty(x => x.Name, entity.Name));

            expr = Helper.Combine(expr, s => s.SetProperty(x => x.UpdatedAt, entity.UpdatedAt));
            expr = Helper.Combine(expr, s => s.SetProperty(x => x.IsPrivate, entity.IsPrivate));

            var rowsAffected = await query.ExecuteUpdateAsync(expr);

            return rowsAffected > 0;
        }
    }
}
