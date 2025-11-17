using System.ComponentModel.DataAnnotations.Schema;

namespace ZvitPlus.DAL.Entities
{
    [Table("users")]
    public class User : BaseEntity
    {
        [Column("email")]
        public required string Email { get; set; }

        [Column("login")]
        public required string Login { get; set; } = string.Empty;

        [Column("password_hash")]
        public required string PasswordHash { get; set; }

        public ICollection<Template> Templates { get; set; } = [];

        public ICollection<Report> Reports = [];
    }
}
