using Microsoft.EntityFrameworkCore;
using UsersService.Models;

namespace UsersService.Data {
    public class UsersDbContext : DbContext {
        public UsersDbContext(DbContextOptions<UsersDbContext> options) : base(options) {}
        public UsersDbContext() {} 

        public DbSet<User> Users { get; set; }
        public DbSet<UserCart> UserCart { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<UserCart>(entity => {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.UserId).IsRequired();
                entity.Property(e => e.ItemId).IsRequired();
                entity.Property(e => e.Quantity).HasDefaultValue(1);
            });
        }
    }
}
