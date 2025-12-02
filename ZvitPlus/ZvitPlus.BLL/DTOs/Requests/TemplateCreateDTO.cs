using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;
using ZvitPlus.BLL.Interfaces.DTOs;
using ZvitPlus.DAL.Enums;

namespace ZvitPlus.BLL.DTOs.Requests
{
    public class TemplateCreateDTO : ICreateDTO, ITemplateDTO
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public TemplateType Type { get; set; }

        [Required]
        public bool IsPrivate { get; set; }

        [Required]
        public Guid AuthorId { get; set; }

        [Required]
        public IFormFile File { get; set; }
    }
}
