using cqrsVerticalSlices.Models;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CQRSVerticalSlices.Data
{
    public interface IDataContext
    {
        DbSet<UserEntity> Users { get; set; }
        Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
    }

    public class DataContext : DbContext, IDataContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
        public virtual DbSet<UserEntity> Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            string SQLLiteConnectionString = @"Data Source=/Users/claudiugombos/work/_asp.netcore/cqrs_verticalslices/cqrsVerticalSlices/HomeDb.db";
            optionsBuilder.UseSqlite(SQLLiteConnectionString);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserEntity>().HasData(
            new UserEntity
            {
                Id = 1,
                FirstName = "John",
                LastName = "Doe",
                PhoneNumber = "074291773"
            },
            new UserEntity
            {
                Id = 2,
                FirstName = "Michael",
                LastName = "Jackson",
                PhoneNumber = "074291774"
            });
            

        }
    }
}
