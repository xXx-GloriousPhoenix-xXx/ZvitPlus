using ZvitPlus.BLL.DTOs.Requests;
using ZvitPlus.BLL.DTOs.Responses;
using ZvitPlus.BLL.Interfaces.DTOs;

namespace ZvitPlus.BLL.Interfaces
{
    public interface ITemplateService : ICRUDService<TemplateCreateDTO, TemplateUpdateDTO, TemplateReadDTO, ITemplateDTO>
    {
        Task<IEnumerable<TemplateReadDTO>> GetByNameAsync(string name);
    }
}
