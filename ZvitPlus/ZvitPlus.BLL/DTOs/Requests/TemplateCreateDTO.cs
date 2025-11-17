using ZvitPlus.BLL.Interfaces.DTOs;
using ZvitPlus.DAL.Enums;

namespace ZvitPlus.BLL.DTOs.Requests
{
    public class TemplateCreateDTO : ICreateDTO, ITemplateDTO
    {
        public required string Name { get; set; }
        public TemplateType Type { get; set; }
        public bool IsPrivate { get; set; }
        public Guid AuthorId { get; set; }
    }
}
