using ZvitPlus.DAL.Entities;

namespace ZvitPlus.DAL.Interfaces
{
    public interface IReportRepository : IBasicCRUD<Report>
    {
        public Task<IEnumerable<Report>> GetByNameAsync(string name);
    }
}
