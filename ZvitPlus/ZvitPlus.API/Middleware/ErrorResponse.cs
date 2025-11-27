namespace ZvitPlus.API.Middleware
{
    public class ErrorResponse
    {
        public int Status { get; set; }
        public string Message { get; set; } = string.Empty;
        public object? Data { get; set; }
        public DateTime Timestamp { get; set; } = DateTime.UtcNow;
    }
}
