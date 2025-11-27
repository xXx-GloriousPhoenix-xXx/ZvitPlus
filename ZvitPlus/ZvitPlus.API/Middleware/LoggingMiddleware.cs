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
            var response = new ErrorResponse();

            switch (ex)
            {
                // 404 - Not Found
                case NotFoundException:
                case UserNotFoundByEmailException:
                case UserNotFoundByLoginException:
                    response.Status = 404;
                    response.Message = ex.Message;
                    break;

                // 400 - Bad Request
                case ValidationException:
                case GrantableRoleException:
                    response.Status = 400;
                    response.Message = ex.Message;
                    break;

                // 401 - Unauthorized
                case LoginException:
                    response.Status = 401;
                    response.Message = ex.Message;
                    break;

                // 409 - Conflict
                case RoleGrantFailedException:
                case AlreadyExistsException:
                case CreateException:
                case UpdateException:
                case DeleteException:
                case BanFailedException:
                case UnbanFailedException:
                    response.Status = 409;
                    response.Message = ex.Message;
                    break;

                // 500 - Internal Server Error
                default:
                    response.Status = 500;
                    response.Message = "Internal server error";
                    break;
            }

            context.Response.ContentType = "application/json";
            context.Response.StatusCode = response.Status;

            return context.Response.WriteAsJsonAsync(response);
        }
    }
}
