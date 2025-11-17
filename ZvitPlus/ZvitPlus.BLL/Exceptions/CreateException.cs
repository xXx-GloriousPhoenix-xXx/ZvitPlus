namespace ZvitPlus.BLL.Exceptions
{
    public class CreateException(string entityName)
        : CRUDException($"Failed creating <{entityName}>");
}
