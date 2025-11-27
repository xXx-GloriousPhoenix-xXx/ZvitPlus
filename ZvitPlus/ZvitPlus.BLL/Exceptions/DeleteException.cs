namespace ZvitPlus.BLL.Exceptions
{
    public class DeleteException(string entityName, Guid entityId) : Exception($"Failed to delete <{entityName}> with id <{entityId}>")
    {
        public string EntityName = entityName;
        public Guid EntityId = entityId;
    }
}
