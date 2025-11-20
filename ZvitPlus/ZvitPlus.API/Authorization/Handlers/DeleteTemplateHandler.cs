using Microsoft.AspNetCore.Authorization;
using ZvitPlus.API.Authorization.Requirements;
using ZvitPlus.API.Extensions;
using ZvitPlus.BLL.Interfaces;
using ZvitPlus.DAL.Enums;

namespace ZvitPlus.API.Authorization.Handlers
{
    public class DeleteTemplateHandler(ITemplateService templateService, IHttpContextAccessor httpContextAccessor) : AuthorizationHandler<DeleteTemplateRequirement>
    {
        private readonly ITemplateService templateService = templateService;
        private readonly IHttpContextAccessor httpContextAccessor = httpContextAccessor;

        protected override async Task HandleRequirementAsync(AuthorizationHandlerContext context, DeleteTemplateRequirement requirement)
        {
            var httpContext = httpContextAccessor.HttpContext;
            if (httpContext is null)
            {
                context.Fail();
                return;
            }

            var currentUser = httpContext.GetCurrentUser();

            if (!Guid.TryParse(httpContext.Request.RouteValues["id"]?.ToString(), out Guid templateId))
            {
                context.Fail();
                return;
            }

            var template = await templateService.GetByIdAsync(templateId);
            if (template is null)
            {
                context.Fail();
                return;
            }

            switch (currentUser.Role)
            {
                case UserRole.User:
                    if (template.AuthorId == currentUser.Id)
                        context.Succeed(requirement);
                    else
                        context.Fail();
                    break;

                case UserRole.Moderator:
                case UserRole.Administrator:
                    context.Succeed(requirement);
                    break;

                default:
                    context.Fail();
                    break;
            }
        }
    }
}
