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

        public async Task<TemplateReadDTO> AddAsync(TemplateCreateDTO dto)
        {
            var createEntity = mapper.Map<Template>(dto);
            var id = await repository.AddAsync(createEntity);
            if (id is null)
            {
                throw new CreateException("template");
            }    

            var createdEntity = await repository.GetByIdAsync((Guid)id);
            var result = mapper.Map<TemplateReadDTO>(createdEntity);
            return result;
        }

        public async Task DeleteAsync(Guid id)
        {
            var templateExistsEntity = await repository.GetByIdAsync(id);
            if (templateExistsEntity is null)
            {
                throw new NotFoundException("template", id);
            }

            var success = await repository.DeleteAsync(id);
            if (!success)
            {
                throw new DeleteException("template", id);
            }
        }

        public async Task<TemplateReadDTO> GetByIdAsync(Guid id)
        {
            var entity = await repository.GetByIdAsync(id);
            if (entity is null)
            {
                throw new NotFoundException("template", id);
            }

            var result = mapper.Map<TemplateReadDTO>(entity);
            return result;
        }

        public async Task<IEnumerable<TemplateReadDTO>> GetPaginatedAsync(int page, int itemsPerPage)
        {
            var entityCollection = await repository.GetPaginated(page, itemsPerPage);
            var result = entityCollection.Select(mapper.Map<TemplateReadDTO>);
            return result;
        }

        public async Task<TemplateReadDTO> UpdateAsync(TemplateUpdateDTO dto)
        {
            var templateExistsEntity = await repository.GetByIdAsync(dto.Id);
            if (templateExistsEntity is null)
            {
                throw new NotFoundException("template", dto.Id);
            }

            var updateEntity = mapper.Map<Template>(dto);
            var success = await repository.UpdateAsync(updateEntity);
            if (!success)
            {
                throw new UpdateException("template", updateEntity.Id);
            }

            var updatedEntity = await repository.GetByIdAsync(updateEntity.Id);
            var result = mapper.Map<TemplateReadDTO>(updatedEntity);
            return result;
        }

        public async Task<IEnumerable<TemplateReadDTO>> GetByNameAsync(string name)
        {
            var entityCollection = await repository.GetByNameAsync(name);
            var result = entityCollection.Select(mapper.Map<TemplateReadDTO>);
            return result;
        }
    }
}
