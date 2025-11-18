using System.Security.Authentication;
using ZvitPlus.BLL.DTOs.Responses;
using ZvitPlus.BLL.Interfaces;
using ZvitPlus.BLL.Interfaces.Helpers;
using ZvitPlus.DAL.Interfaces;

namespace ZvitPlus.BLL.Services
{
    public class AuthenticationService(IUserRepository userRepository, IPasswordHasher passwordHasher, ITokenGenerator tokenGenerator) : IAuthenticationService
    {
        private readonly IUserRepository userRepository = userRepository;
        private readonly IPasswordHasher passwordHasher = passwordHasher;
        private readonly ITokenGenerator tokenGenerator = tokenGenerator;

        public async Task<AuthResponseDTO> VerifyAsync(string login, string password)
        {
            var user = await userRepository.GetByLoginAsync(login);
            if (user is null)
            {
                throw new AuthenticationException("User not found");
            }

            var isValid = passwordHasher.Verify(password, user.PasswordHash);
            if (!isValid)
            {
                throw new AuthenticationException("Invalid password");
            }

            var token = tokenGenerator.GenerateToken(user);

            return new()
            {
                UserId = user.Id,
                Token = token 
            };
        }
    }
}
