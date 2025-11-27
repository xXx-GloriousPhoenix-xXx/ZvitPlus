using Microsoft.AspNetCore.Mvc.ModelBinding;
using System.Text.Json.Serialization;
using ZvitPlus.BLL.Interfaces.DTOs;

namespace ZvitPlus.BLL.DTOs.Requests
{
    public class TemplateUpdateDTO : IUpdateDTO, ITemplateDTO
    {
        public string? Name { get; set; }
        public bool? IsPrivate { get; set; }
    }
}
