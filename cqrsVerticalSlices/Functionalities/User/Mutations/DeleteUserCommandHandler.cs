using System;
using cqrsVerticalSlices.Functionalities.User.Commands.Mutations;
using cqrsVerticalSlices.Models;
using CQRSVerticalSlices.Data;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace cqrsVerticalSlices.Mutations
{
    public class DeleteUserCommandHandler : IRequestHandler<DeleteUserCommand>
    {
        private readonly DataContext _context;

        public DeleteUserCommandHandler(DataContext context)
        {
            _context = context;
        }

        public async Task<Unit> Handle(DeleteUserCommand request, CancellationToken cancellationToken)
        {
            if (request.Id != 0)
            {
                var user = await _context.Users.FindAsync(request.Id);
                if (user != null)
                {
                    _context.Users.Remove(user);
                }
            }
            else if (!string.IsNullOrEmpty(request.PhoneNumber))
            {
                var user = await _context.Users.FirstOrDefaultAsync(u => u.PhoneNumber == request.PhoneNumber);
                if (user != null)
                {
                    _context.Users.Remove(user);
                }
            }

            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}

