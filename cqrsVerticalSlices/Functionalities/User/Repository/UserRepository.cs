using System;
using CQRSVerticalSlices.Data;
using cqrsVerticalSlices.Models;
using MediatR;

namespace cqrsVerticalSlices.Functionalities.User.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly IDataContext _context;

        public UserRepository(IDataContext context)
        {
            _context = context;
        }

        public Task<UserEntity?> GetByIdAsync(int id)
        {
            var user = _context.Users.FirstOrDefault(u => u.Id == id);

            return Task.FromResult<UserEntity?>(user);
        }

        public Task<UserEntity?> GetByPhoneNumberAsync(string phoneNumber)
        {
            var user = _context.Users.FirstOrDefault(u => u.PhoneNumber == phoneNumber);

            return Task.FromResult<UserEntity?>(user);
        }

    }
}

