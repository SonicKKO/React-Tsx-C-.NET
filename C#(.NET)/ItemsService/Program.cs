var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.Configure<MongoDbSettings>(
    builder.Configuration.GetSection("MongoDbSettings"));
    builder.Services.AddCors(options => {
    options.AddPolicy("AllowSpecificOrigin", builder => {
        builder.WithOrigins("http://localhost:5173")
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});
builder.Services.AddSingleton<KendamaService>();
builder.Services.AddControllers();


var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.MapControllers();
app.UseCors("AllowSpecificOrigin");
app.UseHttpsRedirection();
app.Run();

