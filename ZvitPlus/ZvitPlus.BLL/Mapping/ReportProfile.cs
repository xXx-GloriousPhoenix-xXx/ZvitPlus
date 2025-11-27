using AutoMapper;
using ZvitPlus.BLL.DTOs.Requests;
using ZvitPlus.BLL.DTOs.Responses;
using ZvitPlus.DAL.Entities;

namespace ZvitPlus.BLL.Mapping
{
    public class ReportProfile : Profile
    {
        public ReportProfile()
        {
            CreateMap<ReportCreateDTO, Report>()
                .ForMember(dest => dest.Id, opt => opt.Ignore())
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.IsPrivate, opt => opt.MapFrom(src => src.IsPrivate))
                .ForMember(dest => dest.AuthorId, opt => opt.MapFrom(src => src.AuthorId))
                .ForMember(dest => dest.TemplateId, opt => opt.MapFrom(src => src.TemplateId))
                .ForMember(dest => dest.CreatedAt, opt => opt.MapFrom(src => DateTime.UtcNow))
                .ForMember(dest => dest.UpdatedAt, opt => opt.MapFrom(src => DateTime.UtcNow))
                .ForMember(dest => dest.LocalPath, opt => opt.MapFrom(src => string.Empty))
                .ForMember(dest => dest.Author, opt => opt.Ignore());

            CreateMap<ReportUpdateDTO, Report>()
                .ForMember(dest => dest.Id, opt => opt.Ignore())
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.IsPrivate, opt => opt.MapFrom(src => src.IsPrivate))
                .ForMember(dest => dest.UpdatedAt, opt => opt.MapFrom(src => DateTime.UtcNow));

            CreateMap<Report, ReportReadDTO>()
                .ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember is not null));
        }
    }
}
