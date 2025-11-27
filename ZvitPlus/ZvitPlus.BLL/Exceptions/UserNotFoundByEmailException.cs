namespace ZvitPlus.BLL.Exceptions
{
    public class UserNotFoundByEmailException(string email) : Exception($"User with email <{email}> not found")
    {
        public string Email = email;
    }
}
