using ZvitPlus.DAL.Entities;

namespace ZvitPlus.DAL.Interfaces
{
    public interface ITemplateRepository : IBasicCRUD<Template>
    {
        public Task<IEnumerable<Template>> GetByNameAsync(string name);
        Task<Template?> GetByIdWithAuthorAsync(Guid id);
    }
}
