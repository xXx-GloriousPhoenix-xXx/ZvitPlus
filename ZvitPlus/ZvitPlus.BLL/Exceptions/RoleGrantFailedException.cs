using ZvitPlus.DAL.Enums;

namespace ZvitPlus.BLL.Exceptions
{
    public class RoleGrantFailedException(Guid userId, UserRole role) : Exception($"Failed to grant role <{role}> to user with id <{userId}>")
    {
        public Guid UserId = userId;
        public UserRole Role = role;
    }
}
