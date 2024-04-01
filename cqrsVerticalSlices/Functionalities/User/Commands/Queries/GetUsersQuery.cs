using System;
using cqrsVerticalSlices.Functionalities.User.Dto;
using cqrsVerticalSlices.Models;
using MediatR;

namespace cqrsVerticalSlices.Functionalities.User.Commands.Queries
{
    public class GetUsersQuery : IRequest<UserResultDto>
    {
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
    }
}

