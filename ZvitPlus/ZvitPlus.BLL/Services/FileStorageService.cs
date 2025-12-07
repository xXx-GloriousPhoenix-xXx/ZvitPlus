using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using ZvitPlus.BLL.Interfaces;

namespace ZvitPlus.BLL.Services
{
    public class FileStorageService(IConfiguration configuration, ILogger<FileStorageService> logger) : IFileStorageService
    {
        private readonly IConfiguration configuration = configuration;
        private readonly ILogger<FileStorageService> logger = logger;

        public async Task<string> SaveTemplateFileAsync(IFormFile file, Guid templateId, Guid authorId)
        {
            return await SaveFileAsync(file, templateId, authorId, "TemplatesFolder");
        }

        public async Task<string> SaveReportFileAsync(IFormFile file, Guid reportId, Guid authorId)
        {
            return await SaveFileAsync(file, reportId, authorId, "ReportsFolder");
        }

        private async Task<string> SaveFileAsync(IFormFile file, Guid entityId, Guid authorId, string folderConfig)
        {
            // File size check
            var maxSize = configuration.GetValue<long>("FileStorage:MaxFileSize");
            if (file.Length > maxSize)
            {
                throw new InvalidOperationException($"File size exceeds {maxSize / 1024 / 1024} MB");
            }

            // File extension check
            var extension = Path.GetExtension(file.FileName).ToLower();
            if (extension != ".rep")
            {
                throw new InvalidOperationException("Only .rep files are allowed");
            }

            // Creating path: RootPath/Folder/AuthorId/EntityId.rep
            var rootPath = configuration["FileStorage:RootPath"];
            var folder = configuration[$"FileStorage:{folderConfig}"];
            var authorFolder = Path.Combine(rootPath!, folder!, authorId.ToString());
            var filePath = Path.Combine(authorFolder, $"{entityId}{extension}");

            // Creating directory
            Directory.CreateDirectory(authorFolder);

            // Saving file
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            logger.LogInformation($"File saved: {filePath}");
            return filePath; // Saving to localpath
        }

        public async Task<(byte[] data, string fileName)> GetTemplateFileAsync(Guid templateId)
        {
            return await GetFileAsync(templateId, "Template");
        }

        public async Task<(byte[] data, string fileName)> GetReportFileAsync(Guid reportId)
        {
            return await GetFileAsync(reportId, "Report");
        }

        private async Task<(byte[] data, string fileName)> GetFileAsync(Guid entityId, string entityName)
        {
            var rootPath = configuration["FileStorage:RootPath"];
            var folder = configuration[$"FileStorage:{entityName}sFolder"];
            var searchPattern = $"*{entityId}.rep";
            var entityFolder = Path.Combine(rootPath!, folder!);

            var files = Directory.GetFiles(entityFolder, searchPattern, SearchOption.AllDirectories);
            if (files.Length == 0)
                throw new FileNotFoundException($"Report file not found for ID: {entityId}");

            var filePath = files[0];
            var fileName = Path.GetFileName(filePath);
            var data = await File.ReadAllBytesAsync(filePath);

            return (data, fileName);
        }

        public Task<bool> DeleteTemplateFileAsync(Guid templateId)
        {
            return DeleteFileAsync(templateId, "TemplatesFolder");
        }

        public Task<bool> DeleteReportFileAsync(Guid reportId)
        {
            return DeleteFileAsync(reportId, "ReportsFolder");
        }

        private Task<bool> DeleteFileAsync(Guid entityId, string folderConfig)
        {
            var rootPath = configuration["FileStorage:RootPath"];
            var folder = configuration[$"FileStorage:{folderConfig}"];
            var searchPattern = $"*{entityId}.rep";
            var entityFolder = Path.Combine(rootPath!, folder!);
            var files = Directory.GetFiles(entityFolder, searchPattern, SearchOption.AllDirectories);
            if (files.Length == 0)
                return Task.FromResult(false);
            File.Delete(files[0]);
            logger.LogInformation($"File deleted: {files[0]}");
            return Task.FromResult(true);
        }

        public Task<string> GetFilePathAsync(string folder, Guid entityId)
        {
            var rootPath = configuration["FileStorage:RootPath"];
            var folderPath = configuration[$"FileStorage:{folder}"];
            var searchPattern = $"*{entityId}.rep";
            var fullFolderPath = Path.Combine(rootPath!, folderPath!);

            var files = Directory.GetFiles(fullFolderPath, searchPattern, SearchOption.AllDirectories);
            if (files.Length == 0)
                return Task.FromResult<string>(null!);

            return Task.FromResult(files[0]);
        }
    }
}
