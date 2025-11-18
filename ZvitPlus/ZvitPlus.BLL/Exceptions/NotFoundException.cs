namespace ZvitPlus.BLL.Exceptions
{
    public class NotFoundException(string entity, Guid id) : Exception($"<{entity}> with id <{id}> not found");
}
