using AutoMapper;
using ZvitPlus.BLL.DTOs.Requests;
using ZvitPlus.BLL.DTOs.Responses;
using ZvitPlus.BLL.Exceptions;
using ZvitPlus.BLL.Interfaces;
using ZvitPlus.DAL.Entities;
using ZvitPlus.DAL.Interfaces;

namespace ZvitPlus.BLL.Services
{
    public class TemplateService(ITemplateRepository repository, IMapper mapper) : ITemplateService
    {
        private readonly ITemplateRepository repository = repository;
        private readonly IMapper mapper = mapper;

        public async Task<TemplateReadDTO> CreateAsync(TemplateCreateDTO dto)
        {
            var createEntity = mapper.Map<Template>(dto);
            var id = await repository.AddAsync(createEntity)
                ?? throw new CreateException("template");
            var readEntity = await repository.GetByIdAsync(id);
            var result = mapper.Map<TemplateReadDTO>(readEntity);
            return result;
        }

        public async Task DeleteByIdAsync(Guid id)
        {
            var success = await repository.DeleteByIdAsync(id);
            if (!success)
            {
                throw new DeleteException("template", id);
            }
        }

        public async Task<TemplateReadDTO> ReadByIdAsync(Guid id)
        {
            var entity = await repository.GetByIdAsync(id);
            var result = mapper.Map<TemplateReadDTO>(entity);
            return result;
        }

        public async Task<IEnumerable<TemplateReadDTO>> ReadPaginatedAsync(int page, int itemsPerPage)
        {
            var entityCollection = await repository.GetPaginated(page, itemsPerPage);
            var result = entityCollection.Select(mapper.Map<TemplateReadDTO>);
            return result;
        }

        public async Task<TemplateReadDTO> UpdateAsync(TemplateUpdateDTO dto)
        {
            var updateEntity = mapper.Map<Template>(dto);
            var success = await repository.UpdateAsync(updateEntity);
            if (!success)
            {
                throw new UpdateException("template", updateEntity.Id);
            }
            var readEntity = await repository.GetByIdAsync(updateEntity.Id);
            var result = mapper.Map<TemplateReadDTO>(readEntity);
            return result;
        }

        // ToDo Add Search by name
        // Return IEnumerable<T> by string Name
    }
}
