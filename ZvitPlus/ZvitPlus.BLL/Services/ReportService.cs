using AutoMapper;
using ZvitPlus.BLL.DTOs.Requests;
using ZvitPlus.BLL.DTOs.Responses;
using ZvitPlus.BLL.Interfaces;
using ZvitPlus.DAL.Interfaces;
using ZvitPlus.DAL.Entities;
using ZvitPlus.BLL.Exceptions;

namespace ZvitPlus.BLL.Services
{
    public class ReportService(
        IUserRepository userRepository,
        ITemplateRepository templateRepository,
        IReportRepository reportRepository,
        IFileStorageService fileStorageService,
        IMapper mapper
        ) : IReportService
    {
        private readonly IUserRepository userRepository = userRepository;
        private readonly ITemplateRepository templateRepository = templateRepository;
        private readonly IReportRepository reportRepository = reportRepository;
        private readonly IFileStorageService fileStorageService = fileStorageService;
        private readonly IMapper mapper = mapper;

        public async Task<ReportReadDTO> AddAsync(ReportCreateDTO dto)
        {
            var userExistsEntity = await userRepository.GetByIdAsync(dto.AuthorId);
            if (userExistsEntity is null)
            {
                throw new NotFoundException("User", dto.AuthorId);
            }

            var templateExistsEntity = await templateRepository.GetByIdAsync(dto.TemplateId);
            if (templateExistsEntity is null)
            {
                throw new NotFoundException("Template", dto.TemplateId);
            }

            var reportEntity = mapper.Map<Report>(dto);

            var reportId = await reportRepository.AddAsync(reportEntity);
            if (reportId is null)
            {
                throw new CreateException("report");
            }

            string filePath;
            try
            {
                filePath = await fileStorageService.SaveReportFileAsync(
                    dto.File,
                    reportId.Value,
                    dto.AuthorId
                );
            }
            catch (Exception ex)
            {
                await reportRepository.DeleteAsync(reportId.Value);
                throw new FileStorageException("Failed to save report file", ex);
            }

            reportEntity.LocalPath = filePath;
            await reportRepository.UpdateAsync(reportEntity);

            var readEntity = await reportRepository.GetByIdWithDetailsAsync(reportId.Value);
            var result = mapper.Map<ReportReadDTO>(readEntity);
            return result;
        }

        public async Task DeleteAsync(Guid id)
        {
            var reportExistsEntity = await reportRepository.GetByIdAsync(id);
            if (reportExistsEntity is null)
            {
                throw new NotFoundException("report", id);
            }

            await fileStorageService.DeleteReportFileAsync(id);

            var success = await reportRepository.DeleteAsync(id);
            if (!success)
            {
                throw new DeleteException("report", id);
            }
        }

        public async Task<ReportReadDTO> GetByIdAsync(Guid id)
        {
            var entity = await reportRepository.GetByIdWithDetailsAsync(id);
            if (entity is null)
            {
                throw new NotFoundException("report", id);
            }

            var result = mapper.Map<ReportReadDTO>(entity);
            return result;
        }

        public async Task<IEnumerable<ReportReadDTO>> GetPaginatedAsync(int page, int itemsPerPage)
        {
            var entityCollection = await reportRepository.GetPaginatedWithDetailsAsync(page, itemsPerPage);
            var result = entityCollection.Select(mapper.Map<ReportReadDTO>);
            return result;
        }

        public async Task<ReportReadDTO> UpdateAsync(Guid id, ReportUpdateDTO dto)
        {
            var existingReport = await reportRepository.GetByIdAsync(id);
            if (existingReport is null)
            {
                throw new NotFoundException("report", id);
            }

            var updateEntity = mapper.Map<Report>(dto);
            updateEntity.Id = id;

            updateEntity.AuthorId = existingReport.AuthorId;
            updateEntity.TemplateId = existingReport.TemplateId;
            updateEntity.CreatedAt = existingReport.CreatedAt;
            updateEntity.LocalPath = existingReport.LocalPath;
            updateEntity.OriginalFileName = existingReport.OriginalFileName;
            updateEntity.FileSize = existingReport.FileSize;

            if (dto.File != null)
            {
                await fileStorageService.DeleteReportFileAsync(id);

                var newFilePath = await fileStorageService.SaveReportFileAsync(
                    dto.File,
                    id,
                    existingReport.AuthorId
                );

                updateEntity.LocalPath = newFilePath;
                updateEntity.OriginalFileName = dto.File.FileName;
                updateEntity.FileSize = dto.File.Length;
            }

            var success = await reportRepository.UpdateAsync(updateEntity);
            if (!success)
            {
                throw new UpdateException("report", updateEntity.Id);
            }

            var readEntity = await reportRepository.GetByIdWithDetailsAsync(updateEntity.Id);
            var result = mapper.Map<ReportReadDTO>(readEntity);
            return result;
        }

        public async Task<IEnumerable<ReportReadDTO>> GetByNameAsync(string name)
        {
            var entityCollection = await reportRepository.GetByNameWithDetailsAsync(name);
            var result = entityCollection.Select(mapper.Map<ReportReadDTO>);
            return result;
        }
        public async Task<(byte[] fileData, string fileName)> DownloadReportFileAsync(Guid reportId)
        {
            var report = await reportRepository.GetByIdAsync(reportId);
            if (report is null)
            {
                throw new NotFoundException("report", reportId);
            }

            return await fileStorageService.GetReportFileAsync(reportId);
        }

    }
}
