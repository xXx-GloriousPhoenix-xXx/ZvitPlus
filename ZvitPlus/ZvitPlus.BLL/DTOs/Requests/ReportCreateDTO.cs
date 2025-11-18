using System.ComponentModel.DataAnnotations;
using ZvitPlus.BLL.Interfaces.DTOs;

namespace ZvitPlus.BLL.DTOs.Requests
{
    public class ReportCreateDTO : ICreateDTO, IReportDTO
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public bool IsPrivate { get; set; }

        [Required]
        public Guid TemplateId { get; set; }

        [Required]
        public Guid AuthorId { get; set; }
    }
}
