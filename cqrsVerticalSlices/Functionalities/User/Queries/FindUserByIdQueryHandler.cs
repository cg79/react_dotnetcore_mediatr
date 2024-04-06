using System;
using cqrsVerticalSlices.Models;
using MediatR;
using cqrsVerticalSlices.Functionalities.User.Commands.Queries;
using cqrsVerticalSlices.Functionalities.User.Repository;

namespace cqrsVerticalSlices.Queries
{

    public class FindUserByIdQueryHandler : IRequestHandler<FindUserByIdQuery, UserEntity>
    {
        private readonly IUserRepository _userRepository;

        public FindUserByIdQueryHandler(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public Task<UserEntity?> Handle(FindUserByIdQuery request, CancellationToken cancellationToken)
        {
            return _userRepository.GetByIdAsync(request.Id);
        }
    }

}

