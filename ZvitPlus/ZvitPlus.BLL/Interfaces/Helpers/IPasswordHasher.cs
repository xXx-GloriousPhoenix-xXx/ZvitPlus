namespace ZvitPlus.BLL.Interfaces.Helpers
{
    public interface IPasswordHasher
    {
        string HashPassword(string password);
        bool Verify(string plainPassword, string hashedPassword);
    }
}
