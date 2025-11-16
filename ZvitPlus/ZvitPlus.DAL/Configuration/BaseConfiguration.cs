using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ZvitPlus.DAL.Entities;

namespace ZvitPlus.DAL.Configuration
{
    public class BaseConfiguration<T> : IEntityTypeConfiguration<T>
        where T : BaseEntity
    {
        public void Configure(EntityTypeBuilder<T> builder)
        {
            builder
                .HasKey(x => x.Id);
        }
    }
}
