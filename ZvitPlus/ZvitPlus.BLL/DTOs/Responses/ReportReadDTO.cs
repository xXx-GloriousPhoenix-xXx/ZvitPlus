using ZvitPlus.BLL.Interfaces.DTOs;

namespace ZvitPlus.BLL.DTOs.Responses
{
    public class ReportReadDTO : IReadDTO, IReportDTO
    {
        public required string Name { get; set; }
        public bool IsPrivate { get; set; } = false;
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public Guid TemplateId { get; set; }
        public Guid AuthorId { get; set; }
        public TemplateReadDTO? Template { get; set; }
        public UserReadDTO? Author { get; set; }
    }
}
