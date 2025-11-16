using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ZvitPlus.Domain.Entities;

namespace ZvitPlus.DAL.Configuration
{
    public class ReportConfiguration : IEntityTypeConfiguration<Report>
    {
        public void Configure(EntityTypeBuilder<Report> builder)
        {
            builder
                .HasOne(x => x.Author)
                .WithMany(x => x.Reports)
                .HasForeignKey(x => x.AuthorId);
            builder
                .HasOne(x => x.Template)
                .WithMany(x => x.Reports)
                .HasPrincipalKey(x => x.AuthorId);
        }
    }
}
