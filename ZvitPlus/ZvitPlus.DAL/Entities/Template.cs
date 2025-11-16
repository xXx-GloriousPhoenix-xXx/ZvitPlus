using System.ComponentModel.DataAnnotations.Schema;
using ZvitPlus.DAL.Entities;
using ZvitPlus.Domain.Enums;

namespace ZvitPlus.Domain.Entities
{
    [Table("templates")]
    public class Template : BaseEntity
    {
        [Column("name")]
        public string Name { get; set; } = string.Empty;

        [Column("type")]
        public TemplateType Type { get; set; }

        [Column("local_path")]
        public string LocalPath { get; set; } = string.Empty;

        [Column("is_private")]
        public bool IsPrivate { get; set; } = false;

        [Column("created_at")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [Column("updated_at")]
        public DateTime UpdatedAt { get; set; }

        [Column("author_id")]
        public Guid AuthorId { get; set; }

        [ForeignKey(nameof(AuthorId))]
        public User? Author { get; set; }

        public ICollection<Report> Reports { get; set; } = [];
    }
}
