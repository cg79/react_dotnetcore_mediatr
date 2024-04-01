using System;
using MediatR;

namespace cqrsVerticalSlices.Functionalities.User.Commands.Mutations
{
    public class DeleteUserByPhoneCommand : IRequest
    {
        public required string PhoneNumber { get; set; }
    }
}

