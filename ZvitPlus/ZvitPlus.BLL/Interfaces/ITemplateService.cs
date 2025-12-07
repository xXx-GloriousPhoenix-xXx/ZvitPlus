using ZvitPlus.BLL.DTOs.Requests;
using ZvitPlus.BLL.DTOs.Responses;
using ZvitPlus.BLL.Interfaces.DTOs;
using ZvitPlus.DAL.Enums;

namespace ZvitPlus.BLL.Interfaces
{
    public interface ITemplateService : ICRUDService<TemplateCreateDTO, TemplateUpdateDTO, TemplateReadDTO, ITemplateDTO>
    {
        Task<IEnumerable<TemplateReadDTO>> GetByNameAsync(string name);
        Task<IEnumerable<TemplateReadDTO>> GetPaginatedAsync(
            int page, int itemsPerPage,
            string search,
            TemplateType? type
            );
    }
}
