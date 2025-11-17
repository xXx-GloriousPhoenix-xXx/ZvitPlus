using System.Data.Common;

namespace ZvitPlus.BLL.Exceptions
{
    public class CRUDException(string message) : DbException(message);
}
