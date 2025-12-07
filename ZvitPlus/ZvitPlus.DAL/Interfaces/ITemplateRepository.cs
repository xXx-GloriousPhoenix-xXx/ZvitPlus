using ZvitPlus.DAL.Entities;
using ZvitPlus.DAL.Enums;

namespace ZvitPlus.DAL.Interfaces
{
    public interface ITemplateRepository : IBasicCRUD<Template>
    {
        public Task<IEnumerable<Template>> GetByNameAsync(string name);
        Task<Template?> GetByIdWithAuthorAsync(Guid id);
        Task<IEnumerable<Template>> GetPaginatedAsync(int page, int itemsPerPage, string search, TemplateType? type);
    }
}
