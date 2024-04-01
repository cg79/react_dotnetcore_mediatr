using System;
using cqrsVerticalSlices.Functionalities.User.Commands.Mutations;
using CQRSVerticalSlices.Data;
using MediatR;

namespace cqrsVerticalSlices.Mutations
{
    public class UpdateUserCommandHandler : IRequestHandler<UpdateUserCommand>
    {
        private readonly DataContext _context;

        public UpdateUserCommandHandler(DataContext context)
        {
            _context = context;
        }

        public async Task<Unit> Handle(UpdateUserCommand request, CancellationToken cancellationToken)
        {
            var user = await _context.Users.FindAsync(request.Id);

            if (user == null)
            {
                throw new Exception("User not found.");
            }

            user.FirstName = request.FirstName;
            user.LastName = request.LastName;
            user.PhoneNumber = request.PhoneNumber;

            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}

