using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ZvitPlus.Domain.Entities;

namespace ZvitPlus.DAL.Configuration
{
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder
                .HasMany(x => x.Reports)
                .WithOne(x => x.Author)
                .HasForeignKey(x => x.AuthorId);
        }
    }
}
