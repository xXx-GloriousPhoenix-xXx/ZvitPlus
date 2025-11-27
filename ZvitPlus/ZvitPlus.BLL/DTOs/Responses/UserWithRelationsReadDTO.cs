using System.Text.Json.Serialization;
using ZvitPlus.BLL.Helpers;
using ZvitPlus.BLL.Interfaces.DTOs;
using ZvitPlus.DAL.Enums;

namespace ZvitPlus.BLL.DTOs.Responses
{
    public class UserWithRelationsReadDTO : UserReadDTO
    {
        public ICollection<TemplateReadDTO> Templates { get; set; } = [];
        public ICollection<ReportReadDTO> Reports { get; set; } = [];
    }
}
