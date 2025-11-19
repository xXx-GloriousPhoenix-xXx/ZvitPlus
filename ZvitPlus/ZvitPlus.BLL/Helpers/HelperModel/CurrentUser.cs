using ZvitPlus.DAL.Enums;

namespace ZvitPlus.BLL.Helpers.HelperModel
{
    public class CurrentUser
    {
        public Guid Id { get; set; }
        public UserRole Role { get; set; }
    }
}
