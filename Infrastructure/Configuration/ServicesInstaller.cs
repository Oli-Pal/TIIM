using Application.Configuration;
using Application.Mapper;
using Application.Repos;
using Application.Services;
using Domain.Configuration;
using Infrastructure.DataAccess.Repos;
using Infrastructure.Mappers;
using Infrastructure.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;


namespace Infrastructure.Configuration
{
    public static class ServicesInstaller
    {
        public static IServiceCollection InstallServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddSingleton<IMapper, Mapper>();
            services.AddScoped<IUserRepo, UserRepo>();
            services.AddScoped<IAuthenticationService, AuthenticationService>();

            services.AddScoped<IPhotoRepo, PhotoRepo>();
            services.Configure<CloudinarySettings>(configuration.GetSection("CloudinarySettings"));
            services.AddScoped<ICloudinaryService, CloudinaryService>();
            services.AddScoped<IFollowRepo, FollowRepo>();


            return services;
        }
    }
}