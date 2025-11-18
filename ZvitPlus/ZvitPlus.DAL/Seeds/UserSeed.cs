using Microsoft.EntityFrameworkCore;
using ZvitPlus.DAL.Enums; 
using ZvitPlus.DAL.Entities;

namespace ZvitPlus.DAL.Seeds
{
    public static class UserSeed
    {
        public static void Seed(ModelBuilder modelBuilder)
        {
            var adminId = Guid.Parse("AAAAAAAA-AAAA-AAAA-AAAA-AAAAAAAAAAAA");
            var adminPasswordHash = "$2a$11$VItJx2dEyqoR2dtqcYxBkuK0OGD1VLD1Q6yYAEZ9rXy8jzvRw7D6K";

            modelBuilder.Entity<User>().HasData(new User
            {
                Id = adminId,
                Login = "admin",
                Email = "admin@zvitplus.com",
                PasswordHash = adminPasswordHash,
                Role = UserRole.Administrator
            });
        }
    }
}
