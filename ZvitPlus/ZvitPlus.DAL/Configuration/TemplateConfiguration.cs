using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ZvitPlus.DAL.Entities;

namespace ZvitPlus.DAL.Configuration
{
    public class TemplateConfiguration : IEntityTypeConfiguration<Template>
    {
        public void Configure(EntityTypeBuilder<Template> builder)
        {
            builder
                .HasMany(x => x.Reports)
                .WithOne(x => x.Template)
                .HasForeignKey(x => x.TemplateId);
            builder
                .HasOne(x => x.Author)
                .WithMany(x => x.Templates)
                .HasForeignKey(x => x.AuthorId);
        }
    }
}
