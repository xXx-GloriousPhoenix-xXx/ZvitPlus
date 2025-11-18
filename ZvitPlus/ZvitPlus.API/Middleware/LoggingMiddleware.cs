using System.ComponentModel.DataAnnotations;
using ZvitPlus.BLL.Exceptions;

namespace ZvitPlus.API.Middleware
{
    public class LoggingMiddleware(RequestDelegate next, ILogger<LoggingMiddleware> logger)
    {
        private readonly RequestDelegate next = next;
        private readonly ILogger<LoggingMiddleware> logger = logger;

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await next(context);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Unhandled exception");

                await HandleExceptionAsync(context, ex);
            }
        }

        private static Task HandleExceptionAsync(HttpContext context, Exception ex)
        {
            var (status, message) = ex switch
            {
                NotFoundException => (404, ex.Message),
                UpdateException => (409, ex.Message),
                CreateException => (409, ex.Message),
                DeleteException => (409, ex.Message),
                ValidationException => (400, ex.Message),
                LoginException => (401, ex.Message),
                _ => (500, "Internal server error")
            };

            context.Response.ContentType = "application/json";
            context.Response.StatusCode = status;

            return context.Response.WriteAsJsonAsync(new { error = message });
        }
    }
}
