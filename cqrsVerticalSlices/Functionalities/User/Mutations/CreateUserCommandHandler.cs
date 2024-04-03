using System;
using cqrsVerticalSlices.Functionalities.User.Commands.Mutations;
using cqrsVerticalSlices.Functionalities.User.Repository;
using cqrsVerticalSlices.Models;
using CQRSVerticalSlices.Data;
using MediatR;

namespace cqrsVerticalSlices.Mutations
{
    public class CreateUserCommandHandler : IRequestHandler<CreateUserCommand>
    {
        private readonly IUserRepository _userRepository;

        public CreateUserCommandHandler(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }


        public async Task<Unit> Handle(CreateUserCommand request, CancellationToken cancellationToken)
        {
            return await _userRepository.CreateUserAsync(request, cancellationToken);
        }
    }
}

