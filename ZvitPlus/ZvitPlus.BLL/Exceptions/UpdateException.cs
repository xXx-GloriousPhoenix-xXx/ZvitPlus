namespace ZvitPlus.BLL.Exceptions
{
    public class UpdateException(string entity, Guid id) : Exception($"Failed to update <{entity}> with id <{id}>");
}
