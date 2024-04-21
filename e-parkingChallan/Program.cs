using e_parkingChallan.Entities;
using e_parkingChallan.Services;
using Microsoft.Extensions.DependencyInjection.Extensions;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.Configure<EParkingDatabaseSettings>(
    builder.Configuration.GetSection("ConnectionStrings"));
    
builder.Services.AddSingleton<UserService>();
builder.Services.AddSingleton<LocationService>();
builder.Services.AddSingleton<VehicleService>();
builder.Services.AddSingleton<ViolationService>();

builder.Services.AddHttpContextAccessor();
builder.Services.AddControllers();
builder.Services.AddCors(CorsOptions => {
    CorsOptions.AddPolicy("reactApp", policy =>{
        policy.WithOrigins("http://localhost:3000").AllowCredentials().AllowAnyHeader().AllowAnyMethod();
    });
});
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();


var app = builder.Build();

// Configure the HTTP request pipeline.

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();
app.UseCors("reactApp");

app.Run();
