using AutoMapper;
using ZvitPlus.BLL.DTOs.Requests;
using ZvitPlus.BLL.DTOs.Responses;
using ZvitPlus.BLL.Exceptions;
using ZvitPlus.BLL.Interfaces;
using ZvitPlus.DAL.Entities;
using ZvitPlus.DAL.Interfaces;

namespace ZvitPlus.BLL.Services
{
    public class TemplateService(IUserRepository userRepository, ITemplateRepository templateRepository, IMapper mapper) : ITemplateService
    {
        private readonly IUserRepository userRepository = userRepository;
        private readonly ITemplateRepository templateRepository = templateRepository;
        private readonly IMapper mapper = mapper;

        public async Task<TemplateReadDTO> AddAsync(TemplateCreateDTO dto)
        {
            var createEntity = mapper.Map<Template>(dto);
            var id = await templateRepository.AddAsync(createEntity);
            if (id is null)
            {
                throw new CreateException("template");
            }

            var author = await userRepository.GetByIdAsync(createEntity.AuthorId);
            if (author is null)
            {
                throw new NotFoundException("user", createEntity.AuthorId);
            }

            createEntity.Author = author;

            var createdEntity = await templateRepository.GetByIdAsync((Guid)id);
            var result = mapper.Map<TemplateReadDTO>(createdEntity);
            return result;
        }

        public async Task DeleteAsync(Guid id)
        {
            var templateExistsEntity = await templateRepository.GetByIdAsync(id);
            if (templateExistsEntity is null)
            {
                throw new NotFoundException("template", id);
            }

            var success = await templateRepository.DeleteAsync(id);
            if (!success)
            {
                throw new DeleteException("template", id);
            }
        }

        public async Task<TemplateReadDTO> GetByIdAsync(Guid id)
        {
            var entity = await templateRepository.GetByIdAsync(id);
            if (entity is null)
            {
                throw new NotFoundException("template", id);
            }

            var result = mapper.Map<TemplateReadDTO>(entity);
            return result;
        }

        public async Task<IEnumerable<TemplateReadDTO>> GetPaginatedAsync(int page, int itemsPerPage)
        {
            var entityCollection = await templateRepository.GetPaginated(page, itemsPerPage);
            var result = entityCollection.Select(mapper.Map<TemplateReadDTO>);
            return result;
        }

        public async Task<TemplateReadDTO> UpdateAsync(Guid id, TemplateUpdateDTO dto)
        {
            var templateExistsEntity = await templateRepository.GetByIdAsync(id);
            if (templateExistsEntity is null)
            {
                throw new NotFoundException("template", id);
            }

            var updateEntity = mapper.Map<Template>(dto);
            updateEntity.Id = id;
            var success = await templateRepository.UpdateAsync(updateEntity);
            if (!success)
            {
                throw new UpdateException("template", updateEntity.Id);
            }

            var updatedEntity = await templateRepository.GetByIdAsync(updateEntity.Id);
            var result = mapper.Map<TemplateReadDTO>(updatedEntity);
            return result;
        }

        public async Task<IEnumerable<TemplateReadDTO>> GetByNameAsync(string name)
        {
            var entityCollection = await templateRepository.GetByNameAsync(name);
            var result = entityCollection.Select(mapper.Map<TemplateReadDTO>);
            return result;
        }
    }
}
