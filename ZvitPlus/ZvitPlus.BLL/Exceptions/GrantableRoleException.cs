using ZvitPlus.DAL.Enums;

namespace ZvitPlus.BLL.Exceptions
{
    public class GrantableRoleException(UserRole role) : Exception($"Role <{role}> can not be granted")
    {
        public UserRole Role = role;
    }
}
