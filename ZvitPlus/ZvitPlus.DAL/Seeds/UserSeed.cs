using Microsoft.EntityFrameworkCore;
using ZvitPlus.DAL.Enums; 
using ZvitPlus.DAL.Entities;

namespace ZvitPlus.DAL.Seeds
{
    public static class UserSeed
    {
        public static void Seed(ModelBuilder modelBuilder)
        {
            var userSeed = new User[]
            {
                // 1GvSlNpr$oM2
                new()
                {
                    Id = Guid.Parse("AAAAAAAA-AAAA-AAAA-AAAA-AAAAAAAAAAAA"),
                    Login = "admin1",
                    Email = "admin1@zvitplus.com",
                    PasswordHash = "$2a$11$n8TO6y5rRkgUFq1BChLzYujRVKDnJMD41Fcr/raP/tKGTmXuNXXMC",
                    Role = UserRole.Administrator,
                    RegisteredAt = new DateTime(2025, 1, 1, 0, 0, 0, DateTimeKind.Utc)
                },

                // AYow2Y1XYZ6%@wK2
                new()
                {
                    Id = Guid.Parse("BBBBBBBB-BBBB-BBBB-BBBB-BBBBBBBBBBBB"),
                    Login = "moderator1",
                    Email = "moderator1@zvitplus.com",
                    PasswordHash = "$2a$11$MwiHAjOk/BL8WXH5p0R.zu9eiTk.w/ucGkSvNuF/yo3bm6PBzdwIG",
                    Role = UserRole.Moderator,
                    RegisteredAt = new DateTime(2025, 1, 1, 0, 0, 0, DateTimeKind.Utc)
                },
                
                // a7Nzf!BIz@w!
                new()
                {
                    Id = Guid.Parse("CCCCCCCC-CCCC-CCCC-CCCC-CCCCCCCCCCCC"),
                    Login = "user1",
                    Email = "user1@zvitplus.com",
                    PasswordHash = "$2a$11$EP0H.6k.9mu7II7lwUqy6uuV5HVq6nGtCHrpqzgBXyrSjpk/Xub1G",
                    Role = UserRole.User,
                    RegisteredAt = new DateTime(2025, 1, 1, 0, 0, 0, DateTimeKind.Utc)
                }
            };

            modelBuilder.Entity<User>().HasData(userSeed);
        }
    }
}
