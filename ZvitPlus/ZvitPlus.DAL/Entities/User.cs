using System.ComponentModel.DataAnnotations.Schema;
using ZvitPlus.DAL.Entities;

namespace ZvitPlus.Domain.Entities
{
    [Table("users")]
    public class User : BaseEntity
    {
        [Column("email")]
        public string Email { get; set; } = string.Empty;

        [Column("login")]
        public string Login { get; set; } = string.Empty;

        [Column("password_hash")]
        public string PasswordHash { get; set; } = string.Empty;

        public ICollection<Template> Templates { get; set; } = [];

        public ICollection<Report> Reports = [];
    }
}
