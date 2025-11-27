namespace ZvitPlus.BLL.Exceptions
{
    public class CreateException(string entityName) : Exception($"Failed to create <{entityName}>")
    {
        public string EntityName = entityName;
    }
}
