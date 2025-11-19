using Microsoft.AspNetCore.Authorization;
using ZvitPlus.API.Authorization.Requirements;
using ZvitPlus.API.Extensions;
using ZvitPlus.BLL.Interfaces;
using ZvitPlus.DAL.Enums;

namespace ZvitPlus.API.Authorization.Handlers
{
    public class DeleteUserHandler(IUserService userService, IHttpContextAccessor httpContextAccessor) : AuthorizationHandler<DeleteUserRequirement>
    {
        private readonly IUserService userService = userService;
        private readonly IHttpContextAccessor httpContextAccessor = httpContextAccessor;
        protected override async Task HandleRequirementAsync(AuthorizationHandlerContext context, DeleteUserRequirement requirement)
        {
            var httpContext = httpContextAccessor.HttpContext;
            var currentUser = httpContext!.GetCurrentUser();
            var routeId = Guid.Parse((string)httpContext!.Request.RouteValues["id"]!);
            var userToDelete = await userService.GetByIdAsync(routeId);

            if (currentUser.Role == UserRole.Moderator)
            {
                if (userToDelete.Role >= UserRole.Administrator)
                {
                    context.Fail();
                    return;
                }

                if (userToDelete.Role == UserRole.Moderator && userToDelete.Id != currentUser.Id)
                {
                    context.Fail();
                    return;
                }
            }

            if (currentUser.Role == UserRole.User && currentUser.Id != routeId)
            {
                context.Fail();
                return;
            }

            context.Succeed(requirement);
        }
    }
}
