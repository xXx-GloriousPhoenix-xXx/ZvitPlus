using AutoMapper;
using ZvitPlus.BLL.DTOs.Requests;
using ZvitPlus.BLL.DTOs.Responses;
using ZvitPlus.BLL.Exceptions;
using ZvitPlus.BLL.Interfaces;
using ZvitPlus.BLL.Interfaces.DTOs;
using ZvitPlus.DAL.Entities;
using ZvitPlus.DAL.Interfaces;

namespace ZvitPlus.BLL.Services
{
    public class UserService(IUserRepository repository, IMapper mapper) : IUserService
    {
        private readonly IUserRepository repository = repository;
        private readonly IMapper mapper = mapper;

        public async Task<UserReadDTO> AddAsync(UserCreateDTO dto)
        {
            var createEntity = mapper.Map<User>(dto);
            var id = await repository.AddAsync(createEntity);
            if (id is null)
            {
                throw new CreateException("user");
            }

            var createdEntity = await repository.GetByIdAsync((Guid)id);
            var result = mapper.Map<UserReadDTO>(createdEntity);
            return result;
        }

        public async Task DeleteAsync(Guid id)
        {
            var userExistsEntity = await repository.GetByIdAsync(id);
            if (userExistsEntity is null)
            {
                throw new NotFoundException("user", id);
            }

            var success = await repository.DeleteAsync(id);
            if (!success)
            {
                throw new DeleteException("user", id);
            }
        }

        public async Task<UserReadDTO> GetByIdAsync(Guid id)
        {
            var entity = await repository.GetByIdAsync(id);
            if (entity is null)
            {
                throw new NotFoundException("user", id);
            }

            var result = mapper.Map<UserReadDTO>(entity);
            return result;
        }

        public async Task<IEnumerable<UserReadDTO>> GetPaginatedAsync(int page, int itemsPerPage)
        {
            var entityCollection = await repository.GetPaginated(page, itemsPerPage);
            var result = entityCollection.Select(mapper.Map<UserReadDTO>);
            return result;
        }

        public async Task<UserReadDTO> UpdateAsync(UserUpdateDTO dto)
        {
            var userExistsEntity = await repository.GetByIdAsync(dto.Id);
            if (userExistsEntity is null)
            {
                throw new NotFoundException("user", dto.Id);
            }

            var updateEntity = mapper.Map<User>(dto);
            var success = await repository.UpdateAsync(updateEntity);
            if (!success)
            {
                throw new UpdateException("user", updateEntity.Id);
            }

            var updatedEntity = await repository.GetByIdAsync(updateEntity.Id);
            var result = mapper.Map<UserReadDTO>(updatedEntity);
            return result;
        }
    }
}
