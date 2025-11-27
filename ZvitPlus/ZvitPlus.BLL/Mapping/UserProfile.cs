using AutoMapper;
using ZvitPlus.BLL.DTOs.Requests;
using ZvitPlus.BLL.DTOs.Responses;
using ZvitPlus.BLL.Helpers;
using ZvitPlus.DAL.Entities;
using ZvitPlus.DAL.Enums;

namespace ZvitPlus.BLL.Mapping
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<UserCreateDTO, User>()
                .ForMember(dest => dest.Id, opt => opt.Ignore())
                .ForMember(dest => dest.Login, opt => opt.MapFrom(src => src.Login))
                .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.Email))
                .ForMember(dest => dest.PasswordHash, opt => opt.MapFrom(src =>
                    new PasswordHasher().HashPassword(src.Password)))
                .ForMember(dest => dest.Role, opt => opt.MapFrom(src => src.Role))
                .ForMember(dest => dest.IsBanned, opt => opt.MapFrom(src => false));

            CreateMap<UserUpdateDTO, User>()
                .ForMember(dest => dest.Id, opt => opt.Ignore())
                .ForMember(dest => dest.PasswordHash, opt =>
                {
                    opt.PreCondition(src => src.Password is not null);
                    opt.MapFrom(src => new PasswordHasher().HashPassword(src.Password!));
                })
                .ForMember(dest => dest.IsBanned, opt => opt.MapFrom(src => src.IsBanned ?? false))
                .ForAllMembers(opts => opts.Condition((src, dest, val) => val != null));

            CreateMap<User, UserReadDTO>()
                .ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember is not null));

            CreateMap<RegisterDTO, User>()
                .ForMember(dest => dest.Id, opt => opt.Ignore())
                .ForMember(dest => dest.Login, opt => opt.MapFrom(src => src.Login))
                .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.Email))
                .ForMember(dest => dest.PasswordHash, opt => opt.MapFrom(src =>
                    new PasswordHasher().HashPassword(src.Password)))
                .ForMember(dest => dest.Role, opt => opt.MapFrom(src => UserRole.User))
                .ForMember(dest => dest.IsBanned, opt => opt.MapFrom(src => false));
        }
    }
}
