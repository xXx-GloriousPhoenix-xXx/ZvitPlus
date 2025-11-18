namespace ZvitPlus.BLL.Exceptions
{
    public class CreateException(string entity) : Exception($"Failed to create <{entity}>");
}
