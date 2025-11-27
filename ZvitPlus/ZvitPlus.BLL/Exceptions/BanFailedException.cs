namespace ZvitPlus.BLL.Exceptions
{
    public class BanFailedException(Guid userId) : Exception($"Failed to ban user with id <{userId}>")
    {
        public Guid UserId = userId;
    }
}
