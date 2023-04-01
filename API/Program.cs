using API.Extensions;
using Microsoft.EntityFrameworkCore;
using Persistence;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

// We build a class/extension method (named ApplicationServiceExtensions.cs) to add services to clean up our program.cs
builder.Services.AddApplicationServices(builder.Configuration);

var app = builder.Build();

// Configure the HTTP request pipeline (or middle ware)
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("CorsPolicy");

// app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

// the "using" allows us to have the scope will be destroyed as soon as following statement is executed.
using var scope = app.Services.CreateScope();

var services = scope.ServiceProvider;

try{
    var context = services.GetRequiredService<DataContext>();
    await context.Database.MigrateAsync();

    await Seed.SeedData(context);
}
catch (Exception ex){
    var logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "An Error Occurred during migration");
}

app.Run();
