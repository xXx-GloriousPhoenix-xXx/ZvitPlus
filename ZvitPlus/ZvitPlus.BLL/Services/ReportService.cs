using AutoMapper;
using ZvitPlus.BLL.DTOs.Requests;
using ZvitPlus.BLL.DTOs.Responses;
using ZvitPlus.BLL.Interfaces;
using ZvitPlus.DAL.Interfaces;
using ZvitPlus.DAL.Entities;
using ZvitPlus.BLL.Exceptions;

namespace ZvitPlus.BLL.Services
{
    public class ReportService(IReportRepository repository, IMapper mapper) : IReportService
    {
        private readonly IReportRepository repository = repository;
        private readonly IMapper mapper = mapper;

        public async Task<ReportReadDTO> AddAsync(ReportCreateDTO dto)
        {
            var createEntity = mapper.Map<Report>(dto);
            var id = await repository.AddAsync(createEntity);
            if (id is null)
            {
                throw new CreateException("report");
            }

            var readEntity = await repository.GetByIdAsync((Guid)id);
            var result = mapper.Map<ReportReadDTO>(readEntity);
            return result;
        }

        public async Task DeleteAsync(Guid id)
        {
            var reportExistsEntity = await repository.GetByIdAsync(id);
            if (reportExistsEntity is null)
            {
                throw new NotFoundException("report", id);
            }

            var success = await repository.DeleteAsync(id);
            if (!success)
            {
                throw new DeleteException("report", id);
            }
        }

        public async Task<ReportReadDTO> GetByIdAsync(Guid id)
        {
            var entity = await repository.GetByIdAsync(id);
            if (entity is null)
            {
                throw new NotFoundException("report", id);
            }

            var result = mapper.Map<ReportReadDTO>(entity);
            return result;
        }

        public async Task<IEnumerable<ReportReadDTO>> GetPaginatedAsync(int page, int itemsPerPage)
        {
            var entityCollection = await repository.GetPaginated(page, itemsPerPage);
            var result = entityCollection.Select(mapper.Map<ReportReadDTO>);
            return result;
        }

        public async Task<ReportReadDTO> UpdateAsync(ReportUpdateDTO dto)
        {
            var reportExistsEntity = await repository.GetByIdAsync(dto.Id);
            if (reportExistsEntity is null)
            {
                throw new NotFoundException("report", dto.Id);
            }

            var updateEntity = mapper.Map<Report>(dto);
            var success = await repository.UpdateAsync(updateEntity);
            if (!success)
            {
                throw new UpdateException("report", updateEntity.Id);
            }

            var readEntity = await repository.GetByIdAsync(updateEntity.Id);
            var result = mapper.Map<ReportReadDTO>(readEntity);
            return result;
        }

        public async Task<IEnumerable<ReportReadDTO>> GetByNameAsync(string name)
        {
            var entityCollection = await repository.GetByNameAsync(name);
            var result = entityCollection.Select(mapper.Map<ReportReadDTO>);
            return result;
        }
    }
}
