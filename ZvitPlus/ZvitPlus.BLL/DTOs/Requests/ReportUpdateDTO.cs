using Microsoft.AspNetCore.Mvc.ModelBinding;
using ZvitPlus.BLL.Interfaces.DTOs;

namespace ZvitPlus.BLL.DTOs.Requests
{
    public class ReportUpdateDTO : IUpdateDTO, IReportDTO
    {
        public string? Name { get; set; }
        public bool? IsPrivate { get; set; }
    }
}
