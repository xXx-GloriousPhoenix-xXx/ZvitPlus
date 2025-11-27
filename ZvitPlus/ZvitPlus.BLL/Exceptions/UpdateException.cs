namespace ZvitPlus.BLL.Exceptions
{
    public class UpdateException(string entityName, Guid entityId) : Exception($"Failed to update <{entityName}> with id <{entityId}>")
    {
        public Guid EntityId = entityId;
        public string EntityName = entityName;
    }
}
