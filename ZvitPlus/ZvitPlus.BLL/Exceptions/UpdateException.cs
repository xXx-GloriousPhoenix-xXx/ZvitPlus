namespace ZvitPlus.BLL.Exceptions
{
    public class UpdateException(string entityName, Guid entityId)
        : CRUDException($"Failed to update <{entityName}> with id <{entityId}>");
}
