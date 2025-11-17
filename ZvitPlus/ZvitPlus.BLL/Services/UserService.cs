using AutoMapper;
using ZvitPlus.BLL.DTOs.Requests;
using ZvitPlus.BLL.DTOs.Responses;
using ZvitPlus.BLL.Exceptions;
using ZvitPlus.BLL.Interfaces;
using ZvitPlus.DAL.Entities;
using ZvitPlus.DAL.Interfaces;

namespace ZvitPlus.BLL.Services
{
    public class UserService(IUserRepository repository, IMapper mapper) : IUserService
    {
        private readonly IUserRepository repository = repository;
        private readonly IMapper mapper = mapper;

        public async Task<UserReadDTO> CreateAsync(UserCreateDTO dto)
        {
            var createEntity = mapper.Map<User>(dto);
            var id = await repository.AddAsync(createEntity)
                ?? throw new CreateException("user");
            var readEntity = await repository.GetByIdAsync(id);
            var result = mapper.Map<UserReadDTO>(readEntity);
            return result;
        }

        public async Task DeleteByIdAsync(Guid id)
        {
            var success = await repository.DeleteByIdAsync(id);
            if (!success)
            {
                throw new DeleteException("user", id);
            }
        }

        public async Task<UserReadDTO> ReadByIdAsync(Guid id)
        {
            var entity = await repository.GetByIdAsync(id);
            var result = mapper.Map<UserReadDTO>(entity);
            return result;
        }

        public async Task<IEnumerable<UserReadDTO>> ReadPaginatedAsync(int page, int itemsPerPage)
        {
            var entityCollection = await repository.GetPaginated(page, itemsPerPage);
            var result = entityCollection.Select(mapper.Map<UserReadDTO>);
            return result;
        }

        public async Task<UserReadDTO> UpdateAsync(UserUpdateDTO dto)
        {
            var updateEntity = mapper.Map<User>(dto);
            var success = await repository.UpdateAsync(updateEntity);
            if (!success)
            {
                throw new UpdateException("user", updateEntity.Id);
            }
            var readEntity = await repository.GetByIdAsync(updateEntity.Id);
            var result = mapper.Map<UserReadDTO>(readEntity);
            return result;
        }
    }
}
