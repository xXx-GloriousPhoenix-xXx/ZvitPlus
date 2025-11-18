using System.Text.Json.Serialization;
using ZvitPlus.BLL.Interfaces.DTOs;

namespace ZvitPlus.BLL.DTOs.Requests
{
    public class ReportUpdateDTO : IUpdateDTO, IReportDTO
    {
        [JsonIgnore]
        public Guid Id { get; set; }
        public string? Name { get; set; }
        public bool? IsPrivate { get; set; }
    }
}
