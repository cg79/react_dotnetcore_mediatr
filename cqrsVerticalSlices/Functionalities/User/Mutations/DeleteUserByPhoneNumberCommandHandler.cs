using System;
using cqrsVerticalSlices.Functionalities.User.Commands.Mutations;
using cqrsVerticalSlices.Functionalities.User.Repository;
using MediatR;

namespace cqrsVerticalSlices.Mutations
{
    public class DeleteUserByPhoneNumberCommandHandler : IRequestHandler<DeleteUserByPhoneCommand>
    {
        private readonly IUserRepository _userRepository;

        public DeleteUserByPhoneNumberCommandHandler(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<Unit> Handle(DeleteUserByPhoneCommand request, CancellationToken cancellationToken)
        {
            return await _userRepository.DeleteUserByPhoneAsync(request.PhoneNumber, cancellationToken);
        }
    }
}

