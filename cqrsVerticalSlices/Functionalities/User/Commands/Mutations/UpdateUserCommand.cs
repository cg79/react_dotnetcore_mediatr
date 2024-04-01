using System;
using MediatR;

namespace cqrsVerticalSlices.Functionalities.User.Commands.Mutations
{
    public class UpdateUserCommand : IRequest
    {
        public int Id { get; set; }
        public required string FirstName { get; set; }
        public required string LastName { get; set; }
        public required string PhoneNumber { get; set; }
    }
}

