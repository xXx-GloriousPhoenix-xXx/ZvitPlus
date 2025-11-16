using Microsoft.EntityFrameworkCore;
using ZvitPlus.DAL.Context;

var builder = WebApplication.CreateBuilder(args);
var configuration = builder.Configuration;

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddControllers();

builder.Services.AddDbContext<ZvitPlusDbContext>(
    options =>
    {
        options.UseSqlServer(configuration.GetConnectionString(nameof(ZvitPlusDbContext)));
    });

var app = builder.Build();

app.MapControllers();

app.UseSwagger();
app.UseSwaggerUI();

app.Run();