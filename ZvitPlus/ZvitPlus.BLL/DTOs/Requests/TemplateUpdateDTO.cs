using Microsoft.AspNetCore.Http;
using ZvitPlus.BLL.Interfaces.DTOs;

namespace ZvitPlus.BLL.DTOs.Requests
{
    public class TemplateUpdateDTO : IUpdateDTO, ITemplateDTO
    {
        public string? Name { get; set; }
        public bool? IsPrivate { get; set; }
        public IFormFile? File { get; set; }
    }
}