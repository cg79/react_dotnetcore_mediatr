using System;
using cqrsVerticalSlices.Models;
using MediatR;
using cqrsVerticalSlices.Functionalities.User.Commands.Queries;
using cqrsVerticalSlices.Functionalities.User.Repository;

namespace cqrsVerticalSlices.Queries
{

    public class FindUserByPhoneNumberQueryHandler : IRequestHandler<FindUserByPhoneNumberQuery, UserEntity>
    {
        private readonly IUserRepository _userRepository;

        public FindUserByPhoneNumberQueryHandler(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public  Task<UserEntity?> Handle(FindUserByPhoneNumberQuery request, CancellationToken cancellationToken)
        {
            return _userRepository.GetByPhoneNumberAsync(request.PhoneNumber);
        }
    }

}

