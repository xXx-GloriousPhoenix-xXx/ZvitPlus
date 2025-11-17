using ZvitPlus.BLL.DTOs.Requests;
using ZvitPlus.BLL.DTOs.Responses;
using ZvitPlus.BLL.Interfaces.DTOs;

namespace ZvitPlus.BLL.Interfaces
{
    public interface IUserService : ICRUDService<UserCreateDTO, UserUpdateDTO, UserReadDTO, IUserDTO>;
}
