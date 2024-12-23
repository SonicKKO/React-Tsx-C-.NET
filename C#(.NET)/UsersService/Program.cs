using Microsoft.EntityFrameworkCore;
using UsersService.Data;
using UsersService.Extensions;
using UsersService.Services;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);
var jwtKey = builder.Configuration["JwtSettings:SecretKey"];

builder.Services.AddDbContext<UsersDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("PostgresConnection")));
builder.Services.AddControllers();
builder.Services.AddAuthorization();
builder.Services.ConfigureJwt("SKS"); 
builder.Services.AddScoped<AuthService>(provider => {
    var context = provider.GetRequiredService<UsersDbContext>();
    return new AuthService(jwtKey!, context); 
});
builder.Services.AddCors(options => {
    options.AddPolicy("AllowSpecificOrigin", builder => {
        builder.WithOrigins("http://localhost:5173")
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});
builder.Services.AddSwaggerGen(c => {
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "UsersService API", Version = "v1" });
});

var app = builder.Build();

if (app.Environment.IsDevelopment()) {
    app.UseSwagger();
    app.UseSwaggerUI(c => {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "UsersService API v1");
    });
};

app.UseCors("AllowSpecificOrigin");
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.UseHttpsRedirection();
 
app.Run();
