using System;
using MediatR;

namespace cqrsVerticalSlices.Functionalities.User.Commands.Mutations
{
    public class DeleteUserCommand : IRequest
    {
        public int? Id { get; set; }
        public string? PhoneNumber { get; set; }
    }
}

