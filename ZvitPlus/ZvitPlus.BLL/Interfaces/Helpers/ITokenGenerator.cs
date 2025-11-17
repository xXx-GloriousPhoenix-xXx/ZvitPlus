using ZvitPlus.DAL.Entities;

namespace ZvitPlus.BLL.Interfaces.Helpers
{
    public interface ITokenGenerator
    {
        string GenerateToken(User user);
    }
}
