using ZvitPlus.BLL.Interfaces.DTOs;
using ZvitPlus.DAL.Enums;

namespace ZvitPlus.BLL.DTOs.Responses
{
    public class TemplateReadDTO : IReadDTO, ITemplateDTO
    {
        public Guid Id { get; set; }
        public required string Name { get; set; }
        public TemplateType Type { get; set; }
        public required string LocalPath { get; set; }
        public bool IsPrivate { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public Guid AuthorId { get; set; }
    }
}
