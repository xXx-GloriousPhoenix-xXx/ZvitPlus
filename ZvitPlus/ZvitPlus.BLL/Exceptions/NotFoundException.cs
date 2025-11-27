namespace ZvitPlus.BLL.Exceptions
{
    public class NotFoundException(string entityName, Guid entityId) : Exception($"Entity <{entityName}> with <id = {entityId}> not found")
    {
        public Guid EntityId = entityId;
        public string EntityName = entityName;
    }
}
