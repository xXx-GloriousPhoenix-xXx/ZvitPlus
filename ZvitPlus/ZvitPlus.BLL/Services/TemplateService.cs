using AutoMapper;
using ZvitPlus.BLL.DTOs.Requests;
using ZvitPlus.BLL.DTOs.Responses;
using ZvitPlus.BLL.Exceptions;
using ZvitPlus.BLL.Interfaces;
using ZvitPlus.DAL.Entities;
using ZvitPlus.DAL.Interfaces;
using ZvitPlus.DAL.Repositories;
using ZvitPlus.DAL.Repository;

namespace ZvitPlus.BLL.Services
{
    public class TemplateService(
        IUserRepository userRepository, 
        ITemplateRepository templateRepository,
        IFileStorageService fileStorageService,
        IMapper mapper
        ) : ITemplateService
    {
        private readonly IUserRepository userRepository = userRepository;
        private readonly ITemplateRepository templateRepository = templateRepository;
        private readonly IFileStorageService fileStorageService = fileStorageService;
        private readonly IMapper mapper = mapper;

        public async Task<TemplateReadDTO> AddAsync(TemplateCreateDTO dto)
        {
            var author = await userRepository.GetByIdAsync(dto.AuthorId);
            if (author is null)
            {
                throw new NotFoundException("user", dto.AuthorId);
            }

            var templateEntity = mapper.Map<Template>(dto);

            var templateId = await templateRepository.AddAsync(templateEntity);
            if (templateId is null)
            {
                throw new CreateException("template");
            }

            string filePath;
            try
            {
                filePath = await fileStorageService.SaveTemplateFileAsync(
                    dto.File,
                    templateId.Value,
                    dto.AuthorId
                );
            }
            catch (Exception ex)
            {
                await templateRepository.DeleteAsync(templateId.Value);
                throw new FileStorageException("Failed to save template file", ex);
            }

            templateEntity.LocalPath = filePath;
            await templateRepository.UpdateAsync(templateEntity);

            var createdEntity = await templateRepository.GetByIdWithAuthorAsync(templateId.Value);
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
            var entityCollection = await templateRepository.GetPaginatedAsync(page, itemsPerPage);
            var result = entityCollection.Select(mapper.Map<TemplateReadDTO>);
            return result;
        }

        public async Task<TemplateReadDTO> UpdateAsync(Guid id, TemplateUpdateDTO dto)
        {
            var existingTemplate = await templateRepository.GetByIdAsync(id);
            if (existingTemplate is null)
            {
                throw new NotFoundException("template", id);
            }

            var updateEntity = mapper.Map<Template>(dto);
            updateEntity.Id = id;

            updateEntity.AuthorId = existingTemplate.AuthorId;
            updateEntity.Type = existingTemplate.Type;
            updateEntity.CreatedAt = existingTemplate.CreatedAt;
            updateEntity.LocalPath = existingTemplate.LocalPath;
            updateEntity.OriginalFileName = existingTemplate.OriginalFileName;
            updateEntity.FileSize = existingTemplate.FileSize;

            if (dto.File != null)
            {
                await fileStorageService.DeleteTemplateFileAsync(id);

                var newFilePath = await fileStorageService.SaveTemplateFileAsync(
                    dto.File,
                    id,
                    existingTemplate.AuthorId
                );

                updateEntity.LocalPath = newFilePath;
                updateEntity.OriginalFileName = dto.File.FileName;
                updateEntity.FileSize = dto.File.Length;
            }

            var success = await templateRepository.UpdateAsync(updateEntity);
            if (!success)
            {
                throw new UpdateException("template", updateEntity.Id);
            }

            var updatedEntity = await templateRepository.GetByIdWithAuthorAsync(updateEntity.Id);
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
