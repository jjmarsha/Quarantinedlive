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
                optionsBuilder.UseSqlServer("DBSTRING");
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
