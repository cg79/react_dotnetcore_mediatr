using cqrsVerticalSlices.Filter;
using cqrsVerticalSlices.Functionalities.User.Repository;
using CQRSVerticalSlices.Data;
using CQRSVerticalSlices.Helpers;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CQRSVerticalSlices
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            var connectionString = Configuration.GetConnectionString("DefaultConnection");

            services.AddScoped<CaptureResponseActionFilter>();

            services.AddDbContext<DataContext>(x => x.UseSqlite(Configuration.GetConnectionString("DefaultConnection")));
            services.AddScoped<IDataContext, DataContext>();
            services.AddScoped<IUserRepository, UserRepository>();

            services.AddCors();

            services.AddMediatR(typeof(Startup).Assembly);
            services.AddScoped(typeof(IPipelineBehavior<,>), typeof(LoggingBehavior<,>));

            services.AddControllers(options =>
            {
                options.Filters.AddService<CaptureResponseActionFilter>();
            });
            services.AddSwaggerGen();

            
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseSwagger();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            // Enable middleware to serve swagger-ui (HTML, JS, CSS, etc.),
            // specifying the Swagger JSON endpoint.
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "CQRS Demo V1");
                c.RoutePrefix = string.Empty;
            });

            app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

        }
    }
}
