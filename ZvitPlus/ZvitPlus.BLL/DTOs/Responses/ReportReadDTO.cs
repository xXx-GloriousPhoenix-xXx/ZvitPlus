using ZvitPlus.BLL.Interfaces.DTOs;

namespace ZvitPlus.BLL.DTOs.Responses
{
    public class ReportReadDTO : IReadDTO, IReportDTO
    {
        public Guid Id { get; set; }
        public required string Name { get; set; }
        public bool IsPrivate { get; set; } = false;
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public required string LocalPath { get; set; }
        public Guid TemplateId { get; set; }
        public Guid AuthorId { get; set; }
    }
}
