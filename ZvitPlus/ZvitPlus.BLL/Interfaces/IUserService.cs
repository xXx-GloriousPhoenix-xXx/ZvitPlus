using ZvitPlus.BLL.DTOs.Requests;
using ZvitPlus.BLL.DTOs.Responses;
using ZvitPlus.BLL.Interfaces.DTOs;

namespace ZvitPlus.BLL.Interfaces
{
    public interface IUserService : ICRUDService<UserCreateDTO, UserUpdateDTO, UserReadDTO, IUserDTO>
    {
        Task<UserReadDTO> GetByEmailAsync(string email);
        Task<UserReadDTO> GetByLoginAsync(string login);
        Task<IEnumerable<UserReadDTO>> GetPaginatedAsync(int page, int itemsPerPage);
    }
}
