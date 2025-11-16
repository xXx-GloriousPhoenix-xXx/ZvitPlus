using ZvitPlus.Domain.Entities;

namespace ZvitPlus.DAL.Interfaces
{
    public interface ITemplateRepository : IBasicCRUD<Template>
    {
        public Task<IEnumerable<Template>> GetByNameAsync(string name);
    }
}
