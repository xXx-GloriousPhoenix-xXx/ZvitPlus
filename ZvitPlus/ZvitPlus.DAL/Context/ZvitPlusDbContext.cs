using Microsoft.EntityFrameworkCore;
using System.Reflection;
using ZvitPlus.DAL.Entities;
using ZvitPlus.DAL.Seeds;

namespace ZvitPlus.DAL.Context
{
    public class ZvitPlusDbContext(DbContextOptions<ZvitPlusDbContext> options) : DbContext(options)
    {
        public DbSet<Template> Templates { get; set; }
        public DbSet<Report> Reports { get; set; }
        public DbSet<User> Users { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

            modelBuilder.Entity<User>()
                .Property(u => u.Id)
                .ValueGeneratedNever();

            UserSeed.Seed(modelBuilder);
        }
    }
}
