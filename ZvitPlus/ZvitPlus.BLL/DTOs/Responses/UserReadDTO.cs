using ZvitPlus.BLL.Interfaces.DTOs;

namespace ZvitPlus.BLL.DTOs.Responses
{
    public class UserReadDTO : IReadDTO, IUserDTO
    {
        public Guid Id { get; set; }
        public required string Email { get; set; }
        public required string Login { get; set; }
        public ICollection<TemplateReadDTO> Templates { get; set; } = [];
        public ICollection<ReportReadDTO> Reports { get; set; } = [];
    }
}
