using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace quarantined.Models
{
    public partial class quarantineddbContext : DbContext
    {
        public quarantineddbContext()
        {
        }

        public quarantineddbContext(DbContextOptions<quarantineddbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<CatCategory> CatCategory { get; set; }
        public virtual DbSet<Event> Event { get; set; }
        public virtual DbSet<EventCategory> EventCategory { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Server=tcp:quarantined.database.windows.net,1433;Initial Catalog=quarantineddb;Persist Security Info=False;User ID=quarantined;Password=Redbull123.;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("ProductVersion", "2.2.6-servicing-10079");

            modelBuilder.Entity<CatCategory>(entity =>
            {
                entity.ToTable("Cat_category");

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Info)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Event>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Date)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Description).IsUnicode(false);

                entity.Property(e => e.Groupcall)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.HostName)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Language)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Link).IsUnicode(false);

                entity.Property(e => e.Time)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Title)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Topic)
                    .HasMaxLength(100)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<EventCategory>(entity =>
            {
                entity.ToTable("Event_Category");

                entity.Property(e => e.Id)
                    .HasColumnName("ID")
                    .ValueGeneratedNever();

                entity.Property(e => e.IdCategory).HasColumnName("Id_Category");

                entity.Property(e => e.IdEvent).HasColumnName("Id_Event");

                entity.HasOne(d => d.IdCategoryNavigation)
                    .WithMany(p => p.EventCategory)
                    .HasForeignKey(d => d.IdCategory)
                    .HasConstraintName("FK_Event_Category_Cat_category");

                entity.HasOne(d => d.IdEventNavigation)
                    .WithMany(p => p.EventCategory)
                    .HasForeignKey(d => d.IdEvent)
                    .HasConstraintName("FK_Event_Category_Event");
            });
        }
    }
}
