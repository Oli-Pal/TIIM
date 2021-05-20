
using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.DataAccess
{
    
    public class ApplicationDataContext : DbContext
    {
        public ApplicationDataContext(DbContextOptions<ApplicationDataContext> options) : base(options) { }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            BuildFollowEntity(builder);
        }
        public DbSet<AppUser> Users { get; set; }
        public DbSet<Follow> Follows { get; set; }

        
        private static void BuildFollowEntity(ModelBuilder builder)
        {
            builder.Entity<Follow>()
                .HasKey(x => new { x.FollowerId, x.FolloweeId });

            builder.Entity<Follow>()
                .HasOne(f => f.Follower)
                .WithMany(x => x.Followees)
                .HasForeignKey(f => f.FollowerId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Follow>()
                .HasOne(f => f.Followee)
                .WithMany(x => x.Followers)
                .HasForeignKey(f => f.FolloweeId)
                .OnDelete(DeleteBehavior.Cascade);
        }

    }
}