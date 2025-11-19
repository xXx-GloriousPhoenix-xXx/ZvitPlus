using Microsoft.EntityFrameworkCore;
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
builder.Services.AddSwaggerGen();

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

var app = builder.Build();

app.UseMiddleware<LoggingMiddleware>();

app.MapControllers();

app.UseAuthentication();
app.UseAuthorization();

app.UseSwagger();
app.UseSwaggerUI();

app.Run();