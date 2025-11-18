namespace ZvitPlus.BLL.Exceptions
{
    public class DeleteException(string entity, Guid id) : Exception($"Failed to delete <{entity}> with id <{id}>");
}
