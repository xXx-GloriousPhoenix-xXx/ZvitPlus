using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;
using ZvitPlus.API.Authorization.Handlers;
using ZvitPlus.API.Authorization.Requirements;
using ZvitPlus.API.Middleware;
using ZvitPlus.BLL.Helpers;
using ZvitPlus.BLL.Interfaces;
using ZvitPlus.BLL.Interfaces.Helpers;
using ZvitPlus.BLL.Mapping;
using ZvitPlus.BLL.Services;
using ZvitPlus.DAL.Context;
using ZvitPlus.DAL.Interfaces;
using ZvitPlus.DAL.Repositories;
using ZvitPlus.DAL.Repository;

var builder = WebApplication.CreateBuilder(args);
var configuration = builder.Configuration;

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Description = "Enter your JWT token: Bearer {your token}",
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        Scheme = "bearer"
    });

    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            Array.Empty<string>()
        }
    });
});

builder.Services.AddDbContext<ZvitPlusDbContext>(
    options =>
    {
        options.UseSqlServer(configuration.GetConnectionString(nameof(ZvitPlusDbContext)));
    });

builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IReportRepository, ReportRepository>();
builder.Services.AddScoped<ITemplateRepository, TemplateRepository>();

builder.Services.AddScoped<IAuthenticationService, AuthenticationService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IReportService, ReportService>();
builder.Services.AddScoped<ITemplateService, TemplateService>();

builder.Services.AddScoped<IPasswordHasher, PasswordHasher>();

builder.Services.Configure<JwtSettings>(configuration.GetSection(nameof(JwtSettings)));
builder.Services.AddScoped<ITokenGenerator, TokenGenerator>();

builder.Services.AddAutoMapper(cfg =>
{
    cfg.AddProfile<UserProfile>();
    cfg.AddProfile<TemplateProfile>();
    cfg.AddProfile<ReportProfile>();
});

builder.Services.AddScoped<IAuthorizationHandler, DeleteUserHandler>();
builder.Services.AddScoped<IAuthorizationHandler, PatchTemplateHandler>();
builder.Services.AddScoped<IAuthorizationHandler, DeleteTemplateHandler>();
builder.Services.AddScoped<IAuthorizationHandler, PatchReportHandler>();
builder.Services.AddScoped<IAuthorizationHandler, DeleteReportHandler>();


builder.Services.AddHttpContextAccessor();

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("CanDeleteUser", policy => policy.Requirements.Add(new DeleteUserRequirement()));
    options.AddPolicy("CanPatchTemplate", policy => policy.Requirements.Add(new PatchTemplateRequirement()));
    options.AddPolicy("CanDeleteTemplate", policy => policy.Requirements.Add(new DeleteTemplateRequirement()));
    options.AddPolicy("CanPatchReport", policy => policy.Requirements.Add(new PatchReportRequirement()));
    options.AddPolicy("CanDeleteReport", policy => policy.Requirements.Add(new DeleteReportRequirement()));
});

var jwtSettings = configuration.GetSection("JwtSettings").Get<JwtSettings>();
var key = Encoding.ASCII.GetBytes(jwtSettings!.SecretKey);

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = "JwtBearer";
    options.DefaultChallengeScheme = "JwtBearer";
})
.AddJwtBearer("JwtBearer", options =>
{
     options.TokenValidationParameters = new TokenValidationParameters
     {
         ValidateIssuerSigningKey = true,
         IssuerSigningKey = new SymmetricSecurityKey(key),

         ValidateIssuer = true,
         ValidIssuer = jwtSettings.Issuer,

         ValidateAudience = true,
         ValidAudience = jwtSettings.Audience,

         ValidateLifetime = true,
         ClockSkew = TimeSpan.Zero
     };
});

var app = builder.Build();

app.UseMiddleware<LoggingMiddleware>();

app.UseSwagger();
app.UseSwaggerUI();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();