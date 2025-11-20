using AutoMapper;
using ZvitPlus.BLL.DTOs.Responses;
using ZvitPlus.BLL.Exceptions;
using ZvitPlus.BLL.Interfaces;
using ZvitPlus.DAL.Enums;
using ZvitPlus.DAL.Interfaces;

namespace ZvitPlus.BLL.Services
{
    public class UserManagementService(IUserRepository userRepository, IMapper mapper) : IUserManagementService
    {
        private readonly IUserRepository userRepository = userRepository;
        private readonly IMapper mapper = mapper;

        public async Task<UserReadDTO> BanUserAsync(Guid userId, bool ban)
        {
            var userEntityExists = await userRepository.GetByIdAsync(userId);
            if (userEntityExists is null)
            {
                throw new NotFoundException("user", userId);
            }

            var banResult = await userRepository.BanAsync(userId, ban);
            if (!banResult)
            {
                if (ban)
                {
                    throw new BanFailedException(userId);
                }
                else
                {
                    throw new UnbanFailedException(userId);
                }
            }

            var bannedUser = await userRepository.GetByIdAsync(userId);
            if (bannedUser is null)
            {
                throw new NotFoundException("user", userId);
            }

            var result = mapper.Map<UserReadDTO>(bannedUser);
            return result;
        }
        public async Task<UserReadDTO> GrantRoleAsync(Guid userId, UserRole role)
        {
            var userEntityExists = await userRepository.GetByIdAsync(userId);
            if (userEntityExists is null)
            {
                throw new NotFoundException("user", userId);
            }

            var grantRoleResult = await userRepository.GrantRoleAsync(userId, role);
            if (!grantRoleResult)
            {
                throw new RoleGrantFailedException(userId, role);
            }

            var grantedUser = await userRepository.GetByIdAsync(userId);
            if (grantedUser is null)
            {
                throw new NotFoundException("user", userId);
            }

            var result = mapper.Map<UserReadDTO>(grantedUser);
            return result;
        }
    }
}
