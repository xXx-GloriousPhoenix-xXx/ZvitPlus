using ZvitPlus.DAL.Entities;

namespace ZvitPlus.DAL.Interfaces
{
    public interface IReportRepository : IBasicCRUD<Report>
    {
        Task<Report?> GetByIdWithDetailsAsync(Guid id);
        Task<IEnumerable<Report>> GetPaginatedWithDetailsAsync(int page, int itemsPerPage);
        Task<IEnumerable<Report>> GetByNameAsync(string name);
        Task<IEnumerable<Report>> GetByNameWithDetailsAsync(string name);
    }
}
