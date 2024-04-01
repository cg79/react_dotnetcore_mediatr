using System;
using cqrsVerticalSlices.Models;
using MediatR;

namespace cqrsVerticalSlices.Functionalities.User.Commands.Queries
{
    public class FindUserByPhoneNumberQuery : IRequest<UserEntity>
    {
        public required string PhoneNumber { get; set; }
    }
}

