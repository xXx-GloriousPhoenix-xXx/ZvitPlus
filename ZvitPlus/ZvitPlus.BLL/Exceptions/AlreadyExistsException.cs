namespace ZvitPlus.BLL.Exceptions
{
    public class AlreadyExistsException(Guid entityId, string entityName, string parameterName, string parameterValue)
        : Exception($"<{entityName}> with <{parameterName} = {parameterValue}> already exists with <id = {entityId}>")
    {
        public Guid EntityId = entityId;
        public string EntityName = entityName;
        public string ParameterName = parameterName;
        public string ParameterValue = parameterValue;
    }
}
