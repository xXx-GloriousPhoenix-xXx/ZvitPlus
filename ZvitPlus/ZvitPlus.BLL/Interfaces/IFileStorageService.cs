using Microsoft.AspNetCore.Http;

namespace ZvitPlus.BLL.Interfaces
{
    public interface IFileStorageService
    {
        Task<string> SaveTemplateFileAsync(IFormFile file, Guid templateId, Guid authorId);
        Task<string> SaveReportFileAsync(IFormFile file, Guid reportId, Guid authorId);
        Task<(byte[] data, string fileName)> GetTemplateFileAsync(Guid templateId);
        Task<(byte[] data, string fileName)> GetReportFileAsync(Guid reportId);
        Task<bool> DeleteTemplateFileAsync(Guid templateId);
        Task<bool> DeleteReportFileAsync(Guid reportId);
        Task<string> GetFilePathAsync(string folder, Guid entityId);
    }
}
