using System;
using cqrsVerticalSlices.Functionalities.User.Commands.Queries;
using cqrsVerticalSlices.Functionalities.User.Dto;
using cqrsVerticalSlices.Models;
using CQRSVerticalSlices.Data;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace cqrsVerticalSlices.Mutations
{
    public class GetUsersQueryHandler : IRequestHandler<GetUsersQuery, UserResultDto>
    {
        private readonly DataContext _context;

        public GetUsersQueryHandler(DataContext context)
        {
            _context = context;
        }

        async Task<UserResultDto> IRequestHandler<GetUsersQuery, UserResultDto>.Handle(GetUsersQuery request, CancellationToken cancellationToken)
        {
            var users = await _context.Users
                .OrderBy(u => u.PhoneNumber)
                .Skip((request.PageNumber - 1) * request.PageSize)
                .Take(request.PageSize)
                .ToListAsync(cancellationToken);

            var totalCount = await _context.Users.CountAsync();

            var userResult = new UserResultDto
            {
                Users = users,
                TotalCount = totalCount
            };

            return userResult;
        }
    }
}

