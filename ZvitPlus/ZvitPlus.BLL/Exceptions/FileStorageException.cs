namespace ZvitPlus.BLL.Exceptions
{
    public class FileStorageException(string message, Exception ex) : Exception(message, ex)
    {
    }
}
