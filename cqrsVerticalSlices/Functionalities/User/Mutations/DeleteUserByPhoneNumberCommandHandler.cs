using System;
using cqrsVerticalSlices.Functionalities.User.Commands.Mutations;
using cqrsVerticalSlices.Models;
using CQRSVerticalSlices.Data;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace cqrsVerticalSlices.Mutations
{
    public class DeleteUserByPhoneNumberCommandHandler : IRequestHandler<DeleteUserByPhoneCommand>
    {
        private readonly DataContext _context;

        public DeleteUserByPhoneNumberCommandHandler(DataContext context)
        {
            _context = context;
        }

        public async Task<Unit> Handle(DeleteUserByPhoneCommand request, CancellationToken cancellationToken)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.PhoneNumber == request.PhoneNumber);
            if (user != null)
            {
                _context.Users.Remove(user);
            }

            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}

