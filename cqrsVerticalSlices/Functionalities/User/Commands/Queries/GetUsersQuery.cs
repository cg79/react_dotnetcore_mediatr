using System;
using cqrsVerticalSlices.Models;
using MediatR;

namespace cqrsVerticalSlices.Functionalities.User.Commands.Queries
{
    public class GetUsersQuery : IRequest<List<UserEntity>>
    {
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
    }
}

