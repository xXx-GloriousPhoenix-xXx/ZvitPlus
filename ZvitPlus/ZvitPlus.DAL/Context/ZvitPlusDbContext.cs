using Microsoft.EntityFrameworkCore;
using System.Reflection;
using ZvitPlus.Domain.Entities;

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

            modelBuilder.Entity<Report>()
                .HasOne(r => r.Author)
                .WithMany(u => u.Reports)
                .HasForeignKey(r => r.AuthorId)
                .OnDelete(DeleteBehavior.Restrict); // Или DeleteBehavior.NoAction

            modelBuilder.Entity<Report>()
                .HasOne(r => r.Template)
                .WithMany(t => t.Reports)
                .HasForeignKey(r => r.TemplateId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Template>()
                .HasOne(t => t.Author)
                .WithMany(u => u.Templates)
                .HasForeignKey(t => t.AuthorId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
