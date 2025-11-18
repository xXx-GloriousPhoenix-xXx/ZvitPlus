namespace ZvitPlus.BLL.Exceptions
{
    public class UserNotFoundException(string login) : Exception($"User with login <{login}> not found");
}
