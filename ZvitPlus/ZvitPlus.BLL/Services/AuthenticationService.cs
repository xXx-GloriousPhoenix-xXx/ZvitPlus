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
            User? user;
            if (dto.Identifier.Contains('@'))
            {
                user = await userRepository.GetByEmailAsync(dto.Identifier)
                    ?? throw new UserNotFoundByEmailException(dto.Identifier);
            }
            else
            {
                user = await userRepository.GetByLoginAsync(dto.Identifier)
                    ?? throw new UserNotFoundByLoginException(dto.Identifier);
            }

                var isValid = passwordHasher.Verify(dto.Password, user.PasswordHash);
            if (!isValid)
            {
                throw new LoginException(dto.Password, user.Id);
            }

            var response = new AuthTokenDTO
            {
                User = mapper.Map<UserReadDTO>(user),
                Token = tokenGenerator.GenerateToken(user)
            };

            return response;
        }

        public async Task<UserReadDTO> RegisterAsync(RegisterDTO dto)
        {
            var userExistsByLoginEntity = await userRepository.GetByLoginAsync(dto.Login);
            if (userExistsByLoginEntity is not null)
            {
                throw new AlreadyExistsException(userExistsByLoginEntity.Id, "User", "Login", dto.Login);
            }

            var userExistsByEmailEntity = await userRepository.GetByEmailAsync(dto.Email);
            if (userExistsByEmailEntity is not null)
            {
                throw new AlreadyExistsException(userExistsByEmailEntity.Id, "User", "Email", dto.Email);
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
