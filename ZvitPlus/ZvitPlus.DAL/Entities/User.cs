using System.ComponentModel.DataAnnotations.Schema;
using ZvitPlus.DAL.Enums;

namespace ZvitPlus.DAL.Entities
{
    [Table("users")]
    public class User : BaseEntity
    {
        [Column("email")]
        public required string Email { get; set; }

        [Column("login")]
        public required string Login { get; set; }

        [Column("password_hash")]
        public required string PasswordHash { get; set; }

        [Column("role")]
        public required UserRole Role { get; set; }

        [Column("is_banned")]
        public required bool IsBanned { get; set; }

        public ICollection<Template> Templates { get; set; } = [];

        public ICollection<Report> Reports = [];
    }
}
