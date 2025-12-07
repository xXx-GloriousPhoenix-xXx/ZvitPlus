using ZvitPlus.BLL.DTOs.Requests;
using ZvitPlus.BLL.DTOs.Responses;
using ZvitPlus.BLL.Interfaces.DTOs;
using ZvitPlus.DAL.Enums;

namespace ZvitPlus.BLL.Interfaces
{
    public interface IReportService : ICRUDService<ReportCreateDTO, ReportUpdateDTO, ReportReadDTO, IReportDTO>
    {
        Task<IEnumerable<ReportReadDTO>> GetByNameAsync(string name);
        Task<(byte[] fileData, string fileName)> DownloadReportFileAsync(Guid reportId);
        Task<IEnumerable<ReportReadDTO>> GetPaginatedAsync(int page, int itemsPerPage);
    }
}
