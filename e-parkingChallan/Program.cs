using e_parkingChallan.Entities;
using e_parkingChallan.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.Configure<EParkingDatabaseSettings>(
    builder.Configuration.GetSection("ConnectionStrings"));
    
builder.Services.AddSingleton<UserService>();
builder.Services.AddSingleton<LocationService>();
builder.Services.AddSingleton<VehicleService>();
builder.Services.AddSingleton<ViolationService>();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();


var app = builder.Build();

// Configure the HTTP request pipeline.

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();