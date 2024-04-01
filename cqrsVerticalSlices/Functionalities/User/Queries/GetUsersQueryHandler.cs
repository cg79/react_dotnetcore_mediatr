using System;
using cqrsVerticalSlices.Functionalities.User.Commands.Queries;
using cqrsVerticalSlices.Models;
using CQRSVerticalSlices.Data;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace cqrsVerticalSlices.Mutations
{
    public class GetUsersQueryHandler : IRequestHandler<GetUsersQuery, List<UserEntity>>
    {
        private readonly DataContext _context;

        public GetUsersQueryHandler(DataContext context)
        {
            _context = context;
        }

        public async Task<List<UserEntity>> Handle(GetUsersQuery request, CancellationToken cancellationToken)
        {
            return await _context.Users
                .OrderBy(u => u.PhoneNumber)
                .Skip((request.PageNumber - 1) * request.PageSize)
                .Take(request.PageSize)
                .ToListAsync(cancellationToken);
        }
    }
}

