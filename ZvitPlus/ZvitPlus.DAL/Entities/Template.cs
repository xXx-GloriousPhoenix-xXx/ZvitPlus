using System.ComponentModel.DataAnnotations.Schema;
using ZvitPlus.DAL.Enums;

namespace ZvitPlus.DAL.Entities
{
    [Table("templates")]
    public class Template : BaseEntity
    {
        [Column("name")]
        public required string Name { get; set; }

        [Column("original_filename")]
        public required string OriginalFileName { get; set; }

        [Column("file_size")]
        public long FileSize { get; set; }

        [Column("type")]
        public TemplateType Type { get; set; }

        [Column("local_path")]
        public required string LocalPath { get; set; }

        [Column("is_private")]
        public bool IsPrivate { get; set; } = false;

        [Column("created_at")]
        public DateTime CreatedAt { get; set; }

        [Column("updated_at")]
        public DateTime UpdatedAt { get; set; }

        [Column("author_id")]
        public Guid AuthorId { get; set; }

        [ForeignKey(nameof(AuthorId))]
        public User? Author { get; set; }

        public ICollection<Report> Reports { get; set; } = [];
    }
}
