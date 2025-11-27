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

        public async Task<UserReadDTO> AddAsync(UserCreateDTO dto)
        {
            var userExistsByEmail = await repository.GetByEmailAsync(dto.Email);
            if (userExistsByEmail is not null)
            {
                throw new AlreadyExistsException(userExistsByEmail.Id, "User", "email", dto.Email);
            }

            var userExistsByLogin = await repository.GetByLoginAsync(dto.Login);
            if (userExistsByLogin is not null)
            {
                throw new AlreadyExistsException(userExistsByLogin.Id, "User", "login", dto.Login);
            }

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

        public async Task<UserReadDTO> GetByEmailAsync(string email)
        {
            var entity = await repository.GetByEmailAsync(email);
            if (entity is null)
            {
                throw new UserNotFoundByEmailException(email);
            }

            var result = mapper.Map<UserReadDTO>(entity);
            return result;
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

        public async Task<UserReadDTO> GetByLoginAsync(string login)
        {
            var entity = await repository.GetByLoginAsync(login);
            if (entity is null)
            {
                throw new UserNotFoundByLoginException(login);
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

        public async Task<UserReadDTO> UpdateAsync(Guid id, UserUpdateDTO dto)
        {
            var userExistsEntity = await repository.GetByIdAsync(id);
            if (userExistsEntity is null)
            {
                throw new NotFoundException("user", id);
            }

            var updateEntity = mapper.Map<User>(dto);
            updateEntity.Id = id;
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
