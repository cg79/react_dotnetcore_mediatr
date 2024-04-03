using System;
using CQRSVerticalSlices.Data;
using cqrsVerticalSlices.Models;
using MediatR;
using cqrsVerticalSlices.Functionalities.User.Dto;
using Microsoft.EntityFrameworkCore;

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

        public async Task<UserResultDto> GetUsersAsync(int pageNumber, int pageSize, CancellationToken cancellationToken)
        {
            var users = await _context.Users
                .OrderBy(u => u.PhoneNumber)
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync(cancellationToken);

            var totalCount = await _context.Users.CountAsync();

            var userResult = new UserResultDto
            {
                Users = users,
                TotalCount = totalCount
            };

            return userResult;
        }

    }
}

