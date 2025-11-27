namespace ZvitPlus.BLL.Exceptions
{
    public class UnbanFailedException(Guid userId) : Exception($"Failed to unban user with id <{userId}>")
    {
        public Guid UserId = userId;
    }
}
