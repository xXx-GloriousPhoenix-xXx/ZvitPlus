using ZvitPlus.BLL.Interfaces.DTOs;

namespace ZvitPlus.BLL.DTOs.Responses
{
    public class ReportReadDTO : IReadDTO, IReportDTO
    {
        public Guid Id { get; set; }
        public required string Name { get; set; }
        public required string OriginalFileName { get; set; }
        public long FileSize { get; set; }
        public required string LocalPath { get; set; }
        public bool IsPrivate { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public Guid TemplateId { get; set; }
        public Guid AuthorId { get; set; }
        public required string AuthorName { get; set; }
        public required string TemplateName { get; set; }
    }
}
