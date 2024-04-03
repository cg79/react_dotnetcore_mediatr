using System;
using cqrsVerticalSlices.Functionalities.User.Commands.Mutations;
using cqrsVerticalSlices.Models;
using CQRSVerticalSlices.Data;
using MediatR;

namespace cqrsVerticalSlices.Mutations
{
    public class CreateUserCommandHandler : IRequestHandler<CreateUserCommand>
    {
        private readonly IDataContext _context;

        public CreateUserCommandHandler(IDataContext context)
        {
            _context = context;
        }

        public async Task<Unit> Handle(CreateUserCommand request, CancellationToken cancellationToken)
        {
            if (_context.Users.Any(u => u.PhoneNumber == request.PhoneNumber))
            {
                throw new Exception("Contact already exists.");
            }

            var user = new UserEntity
                {
                    FirstName = request.FirstName,
                    LastName = request.LastName,
                    PhoneNumber = request.PhoneNumber
                };

            _context.Users.Add(user);
            var id =  await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
            
        }
    }
}

