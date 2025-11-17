using Microsoft.EntityFrameworkCore;
using ZvitPlus.DAL.Context;
using ZvitPlus.BLL.Helpers;
using ZvitPlus.BLL.Interfaces.Helpers;
using ZvitPlus.BLL.Interfaces;
using ZvitPlus.BLL.Services;

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

builder.Services.Configure<JwtSettings>(configuration.GetSection(nameof(JwtSettings)));

builder.Services.AddScoped<ITokenGenerator, TokenGenerator>();
builder.Services.AddScoped<IAuthenticationService, AuthenticationService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IReportService, ReportService>();

var app = builder.Build();

app.MapControllers();

app.UseSwagger();
app.UseSwaggerUI();

app.Run();