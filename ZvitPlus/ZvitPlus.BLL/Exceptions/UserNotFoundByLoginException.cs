namespace ZvitPlus.BLL.Exceptions
{
    public class UserNotFoundByLoginException(string login) : Exception($"User with login <{login}> not found");
}
