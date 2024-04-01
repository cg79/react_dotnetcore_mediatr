using System;
using cqrsVerticalSlices.Models;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;
using CQRSVerticalSlices.Data;
using cqrsVerticalSlices.Functionalities.User.Commands.Queries;

namespace cqrsVerticalSlices.Queries
{

    public class FindUserByPhoneNumberQueryHandler : IRequestHandler<FindUserByPhoneNumberQuery, UserEntity>
    {
        private readonly IDataContext _context;

        public FindUserByPhoneNumberQueryHandler(IDataContext context)
        {
            _context = context;
        }

        public  Task<UserEntity?> Handle(FindUserByPhoneNumberQuery request, CancellationToken cancellationToken)
        {
            var response =   _context.Users.FirstOrDefault(u => u.PhoneNumber == request.PhoneNumber);
            if (response == null)
            {
                return Task.FromResult<UserEntity?>(null);
            }
            return Task.FromResult<UserEntity?>(response);
        }
    }

}

