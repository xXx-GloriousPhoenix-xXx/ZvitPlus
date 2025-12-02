using ZvitPlus.BLL.Interfaces.DTOs;
using ZvitPlus.DAL.Enums;

namespace ZvitPlus.BLL.DTOs.Responses
{
    public class TemplateReadDTO : IReadDTO, ITemplateDTO
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string OriginalFileName { get; set; }
        public long FileSize { get; set; }
        public TemplateType Type { get; set; }
        public string LocalPath { get; set; }
        public bool IsPrivate { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public Guid AuthorId { get; set; }
        public string AuthorName { get; set; }
    }
}
