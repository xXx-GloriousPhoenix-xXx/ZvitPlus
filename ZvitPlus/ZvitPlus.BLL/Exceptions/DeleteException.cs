namespace ZvitPlus.BLL.Exceptions
{
    public class DeleteException(string entityName, Guid entityId)
        : CRUDException($"Failed to delete <{entityName}> with id <{entityId}>");
}
