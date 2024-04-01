using System;
using MediatR;

namespace cqrsVerticalSlices.Functionalities.User.Commands.Mutations
{
    public class CreateUserCommand : IRequest
    {
        public required string FirstName { get; set; }
        public required string LastName { get; set; }
        public required string PhoneNumber { get; set; }
    }
}

