using Microsoft.AspNetCore.Authorization;
using ZvitPlus.API.Authorization.Requirements;
using ZvitPlus.API.Extensions;
using ZvitPlus.BLL.Interfaces;
using ZvitPlus.DAL.Enums;

namespace ZvitPlus.API.Authorization.Handlers
{
    public class PatchTemplateHandler(ITemplateService templateService, IHttpContextAccessor httpContextAccessor) : AuthorizationHandler<PatchTemplateRequirement>
    {
        private readonly ITemplateService templateService = templateService;
        private readonly IHttpContextAccessor httpContextAccessor = httpContextAccessor;

        protected override async Task HandleRequirementAsync(AuthorizationHandlerContext context, PatchTemplateRequirement requirement)
        {
            var http = httpContextAccessor.HttpContext!;
            var currentUser = http.GetCurrentUser();

            if (currentUser.Role == UserRole.Guest)
            {
                context.Fail();
                return;
            }

            var templateId = Guid.Parse((string)http.Request.RouteValues["id"]!);
            var template = await templateService.GetByIdAsync(templateId);

            if (currentUser.Role == UserRole.User)
            {
                if (template.AuthorId == currentUser.Id)
                {
                    context.Succeed(requirement);
                    return;
                }

                context.Fail();
                return;
            }

            if (currentUser.Role is UserRole.Moderator or UserRole.Administrator)
            {
                context.Succeed(requirement);
                return;
            }
        }
    }
}
