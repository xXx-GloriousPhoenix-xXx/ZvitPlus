namespace ZvitPlus.BLL.Exceptions
{
    public class LoginException(string password, Guid userId) : Exception($"Password <{password}> is wrong for <user = {userId}>")
    {
        public Guid UserId = userId;
        public string Password = password;
    }
}
