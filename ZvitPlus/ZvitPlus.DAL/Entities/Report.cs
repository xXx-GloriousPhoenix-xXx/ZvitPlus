using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using ZvitPlus.DAL.Entities;

namespace ZvitPlus.Domain.Entities
{
    [Table("reports")]
    public class Report : BaseEntity
    {
        [Column("name")]
        public string Name { get; set; } = string.Empty;

        [Column("created_at")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [Column("updated_at")]
        public DateTime UpdatedAt { get; set; }

        [Column("template_id")]
        public Guid TemplateId { get; set; }

        [Column("author_id")]
        public Guid AuthorId { get; set; }

        [ForeignKey(nameof(TemplateId))]
        public Template? Template { get; set; }

        [ForeignKey(nameof(AuthorId))]
        public User? Author { get; set; }
    }
}
