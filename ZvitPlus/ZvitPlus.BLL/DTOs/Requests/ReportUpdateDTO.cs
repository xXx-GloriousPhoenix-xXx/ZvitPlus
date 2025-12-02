using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using ZvitPlus.BLL.Interfaces.DTOs;

namespace ZvitPlus.BLL.DTOs.Requests
{
    public class ReportUpdateDTO : IUpdateDTO, IReportDTO
    {
        public string? Name { get; set; }
        public bool? IsPrivate { get; set; }
        public IFormFile? File { get; set; }
    }
}
