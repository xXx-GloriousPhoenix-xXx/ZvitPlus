using AutoMapper;
using ZvitPlus.BLL.DTOs.Requests;
using ZvitPlus.BLL.DTOs.Responses;
using ZvitPlus.BLL.Interfaces;
using ZvitPlus.DAL.Interfaces;
using ZvitPlus.DAL.Entities;
using ZvitPlus.BLL.Exceptions;

namespace ZvitPlus.BLL.Services
{
    public class ReportService(IUserRepository userRepository, ITemplateRepository templateRepository,IReportRepository reportRepository, IMapper mapper) : IReportService
    {
        private readonly IUserRepository userRepository = userRepository;
        private readonly ITemplateRepository templateRepository = templateRepository;
        private readonly IReportRepository reportRepository = reportRepository;
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

            var createEntity = mapper.Map<Report>(dto);
            var id = await reportRepository.AddAsync(createEntity);
            if (id is null)
            {
                throw new CreateException("report");
            }

            var author = await userRepository.GetByIdAsync(createEntity.AuthorId);
            if (author is null)
            {
                throw new NotFoundException("user", createEntity.AuthorId);
            }

            createEntity.Author = author;

            var readEntity = await reportRepository.GetByIdAsync((Guid)id);
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

            var success = await reportRepository.DeleteAsync(id);
            if (!success)
            {
                throw new DeleteException("report", id);
            }
        }

        public async Task<ReportReadDTO> GetByIdAsync(Guid id)
        {
            var entity = await reportRepository.GetByIdAsync(id);
            if (entity is null)
            {
                throw new NotFoundException("report", id);
            }

            var result = mapper.Map<ReportReadDTO>(entity);
            return result;
        }

        public async Task<IEnumerable<ReportReadDTO>> GetPaginatedAsync(int page, int itemsPerPage)
        {
            var entityCollection = await reportRepository.GetPaginated(page, itemsPerPage);
            var result = entityCollection.Select(mapper.Map<ReportReadDTO>);
            return result;
        }

        public async Task<ReportReadDTO> UpdateAsync(Guid id, ReportUpdateDTO dto)
        {

            var reportExistsEntity = await reportRepository.GetByIdAsync(id);
            if (reportExistsEntity is null)
            {
                throw new NotFoundException("report", id);
            }

            var updateEntity = mapper.Map<Report>(dto);
            updateEntity.Id = id;
            var success = await reportRepository.UpdateAsync(updateEntity);
            if (!success)
            {
                throw new UpdateException("report", updateEntity.Id);
            }

            var readEntity = await reportRepository.GetByIdAsync(updateEntity.Id);
            var result = mapper.Map<ReportReadDTO>(readEntity);
            return result;
        }

        public async Task<IEnumerable<ReportReadDTO>> GetByNameAsync(string name)
        {
            var entityCollection = await reportRepository.GetByNameAsync(name);
            var result = entityCollection.Select(mapper.Map<ReportReadDTO>);
            return result;
        }
    }
}
