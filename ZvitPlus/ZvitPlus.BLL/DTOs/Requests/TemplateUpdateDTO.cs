using ZvitPlus.BLL.Interfaces.DTOs;

namespace ZvitPlus.BLL.DTOs.Requests
{
    public class TemplateUpdateDTO : IUpdateDTO, ITemplateDTO
    {
        public Guid Id { get; set; }
        public string? Name { get; set; }
        public bool? IsPrivate { get; set; }
    }
}
