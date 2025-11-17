using ZvitPlus.BLL.DTOs.Requests;
using ZvitPlus.BLL.DTOs.Responses;
using ZvitPlus.BLL.Interfaces.DTOs;

namespace ZvitPlus.BLL.Interfaces
{
    public interface IReportService : ICRUDService<ReportCreateDTO, ReportUpdateDTO, ReportReadDTO, IReportDTO>
    {
        Task<IEnumerable<ReportReadDTO>> GetByNameAsync(string name);
    }
}
