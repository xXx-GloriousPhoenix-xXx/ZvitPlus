using ZvitPlus.BLL.Interfaces.Helpers;

namespace ZvitPlus.BLL.Helpers;

public class PasswordHasher : IPasswordHasher
{
    public string HashPassword(string password)
    {
        return BCrypt.Net.BCrypt.HashPassword(password);
    }

    public bool Verify(string plainPassword, string hashedPassword)
    {
        return BCrypt.Net.BCrypt.Verify(plainPassword, hashedPassword);
    }
}
