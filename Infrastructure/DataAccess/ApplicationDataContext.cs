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

            BuildPhotoEntity(builder);
            BuildPhotoLikeEntity(builder);
            BuildCommentEntity(builder);

        }
        public DbSet<AppUser> Users { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<PhotoLike> PhotoLikes { get; set; }
        public DbSet<Photo> Photos { get; set; }


        private static void BuildCommentEntity(ModelBuilder builder)
        {
            builder.Entity<Comment>()
                .HasOne(x => x.Photo)
                .WithMany(x => x.CommentsReceived)
                .HasForeignKey(x => x.PhotoId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Comment>()
                .HasOne(x => x.User)
                .WithMany(x => x.CommentsSent)
                .HasForeignKey(x => x.UserId)
                .OnDelete(DeleteBehavior.Cascade);
        }

        private static void BuildPhotoLikeEntity(ModelBuilder builder)
        {
            builder.Entity<PhotoLike>()
                .HasKey(x => new { x.PhotoId, x.LikerId });

            builder.Entity<PhotoLike>()
                .HasOne(x => x.Photo)
                .WithMany(x => x.LikesReceived)
                .HasForeignKey(x => x.PhotoId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<PhotoLike>()
                .HasOne(x => x.Liker)
                .WithMany(x => x.LikesSent)
                .HasForeignKey(x => x.LikerId)
                .OnDelete(DeleteBehavior.Cascade);
        }

        private static void BuildPhotoEntity(ModelBuilder builder)
        {
            builder.Entity<Photo>()
                .HasKey(x => x.Id);

            builder.Entity<Photo>()
                .HasOne(x => x.User)
                .WithMany(x => x.Photos)
                .HasForeignKey(x => x.UserId)
                .OnDelete(DeleteBehavior.Cascade);
        }

    }
}