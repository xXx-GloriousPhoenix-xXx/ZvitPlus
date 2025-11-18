using AutoMapper;
using ZvitPlus.BLL.DTOs.Requests;
using ZvitPlus.BLL.DTOs.Responses;
using ZvitPlus.BLL.Exceptions;
using ZvitPlus.BLL.Interfaces;
using ZvitPlus.BLL.Interfaces.Helpers;
using ZvitPlus.DAL.Entities;
using ZvitPlus.DAL.Interfaces;
using ZvitPlus.DAL.Enums;

namespace ZvitPlus.BLL.Services
{
    public class AuthenticationService(IUserRepository userRepository, IPasswordHasher passwordHasher, ITokenGenerator tokenGenerator, IMapper mapper) : IAuthenticationService
    {
        private readonly IUserRepository userRepository = userRepository;
        private readonly IPasswordHasher passwordHasher = passwordHasher;
        private readonly ITokenGenerator tokenGenerator = tokenGenerator;
        private readonly IMapper mapper = mapper;

        public async Task<AuthTokenDTO> LoginAsync(LoginDTO dto)
        {
            var user = dto.Identifier.Contains('@')
                ? await userRepository.GetByEmailAsync(dto.Identifier)
                : await userRepository.GetByLoginAsync(dto.Identifier);
            if (user is null)
            {
                throw new LoginException("User not found");
            }

            var isValid = passwordHasher.Verify(dto.Password, user.PasswordHash);
            if (!isValid)
            {
                throw new LoginException("Invalid password");
            }

            var token = tokenGenerator.GenerateToken(user);

            return new()
            {
                UserId = user.Id,
                Token = token 
            };
        }

        public async Task<UserReadDTO> RegisterAsync(RegisterDTO dto)
        {
            var userExistsByLoginEntity = await userRepository.GetByLoginAsync(dto.Login);
            if (userExistsByLoginEntity is not null)
            {
                throw new RegisterException($"User with login <{dto.Login}> already exists");
            }

            var userExistsByEmailEntity = await userRepository.GetByEmailAsync(dto.Email);
            if (userExistsByEmailEntity is not null)
            {
                throw new RegisterException($"User with email <{dto.Email}> already exists");
            }

            var user = mapper.Map<User>(dto);
            user.Role = UserRole.User;
            var id = await userRepository.AddAsync(user);
            if (id is null)
            {
                throw new CreateException("user");
            }

            var userCreatedEntity = await userRepository.GetByIdAsync((Guid)id);
            if (userCreatedEntity is null)
            {
                throw new CreateException("user");
            }

            var result = mapper.Map<UserReadDTO>(userCreatedEntity);
            return result;
        }
    }
}
