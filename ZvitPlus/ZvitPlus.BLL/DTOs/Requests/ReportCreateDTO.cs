using ZvitPlus.BLL.Interfaces.DTOs;

namespace ZvitPlus.BLL.DTOs.Requests
{
    public class ReportCreateDTO : ICreateDTO, IReportDTO
    {
        public required string Name { get; set; }
        public bool IsPrivate { get; set; }
        public Guid TemplateId { get; set; }
        public Guid AuthorId { get; set; }
    }
}
