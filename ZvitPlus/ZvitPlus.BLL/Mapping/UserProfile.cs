using AutoMapper;
using ZvitPlus.BLL.DTOs.Requests;
using ZvitPlus.BLL.DTOs.Responses;
using ZvitPlus.BLL.Helpers;
using ZvitPlus.DAL.Entities;

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
                .ForMember(dest => dest.IsBanned, opt => opt.MapFrom(src => false));

            CreateMap<UserUpdateDTO, User>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.PasswordHash, opt =>
                {
                    opt.PreCondition(src => src.Password is not null);
                    opt.MapFrom(src =>
                        new PasswordHasher().HashPassword(src.Password!));
                })
                .ForMember(dest => dest.Login, opt =>
                {
                    opt.PreCondition(src => src.Login is not null);
                    opt.MapFrom(src => src.Login);
                })
                .ForMember(dest => dest.IsBanned, opt => opt.MapFrom(src => false));

            CreateMap<User, UserReadDTO>()
                .ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember is not null));

            CreateMap<RegisterDTO, User>()
                .ForMember(dest => dest.Id, opt => opt.Ignore())
                .ForMember(dest => dest.Login, opt => opt.MapFrom(src => src.Login))
                .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.Email))
                .ForMember(dest => dest.PasswordHash, opt => opt.MapFrom(src =>
                    new PasswordHasher().HashPassword(src.Password)))
                .ForMember(dest => dest.IsBanned, opt => opt.MapFrom(src => false));
        }
    }
}
