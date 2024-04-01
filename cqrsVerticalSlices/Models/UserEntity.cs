using System;
namespace cqrsVerticalSlices.Models
{
    public class UserEntity
    {
        public int Id { get; set; }
        public required string FirstName { get; set; }
        public required string LastName { get; set; }
        public required string PhoneNumber { get; set; }
    }
}

