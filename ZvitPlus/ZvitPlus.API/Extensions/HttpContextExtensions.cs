using System.Security.Claims;
using ZvitPlus.BLL.Helpers.HelperModel;
using ZvitPlus.DAL.Enums;

namespace ZvitPlus.API.Extensions
{
    public static class HttpContextExtensions
    {
        public static CurrentUser GetCurrentUser(this HttpContext httpContext)
        {
            var idClaim = httpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var roleClaim = httpContext.User.FindFirst(ClaimTypes.Role)?.Value;

            if (idClaim == null || roleClaim == null)
                throw new UnauthorizedAccessException("User is not authenticated");

            return new CurrentUser
            {
                Id = Guid.Parse(idClaim),
                Role = Enum.Parse<UserRole>(roleClaim)
            };
        }
    }
}
