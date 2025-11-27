namespace ZvitPlus.BLL.DTOs.Responses
{
    public class TemplateWithRelationsReadDTO : TemplateReadDTO
    {
        public UserReadDTO? Author { get; set; }
    }
}
