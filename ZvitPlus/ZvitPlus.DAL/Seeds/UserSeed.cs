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
            var adminPasswordHash = "$2a$11$5yuDi3v5GgNM3DKDGxNHrO3zFdcRIGWr/AJoUlouW4huxuvuKIGYK"; //admin

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
