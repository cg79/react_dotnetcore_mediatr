using System;
using CQRSVerticalSlices.Data;
using cqrsVerticalSlices.Models;
using MediatR;
using cqrsVerticalSlices.Functionalities.User.Dto;
using Microsoft.EntityFrameworkCore;
using cqrsVerticalSlices.Functionalities.User.Commands.Mutations;

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

        public async Task<Unit> CreateUserAsync(CreateUserCommand request, CancellationToken cancellationToken)
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
            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }

        public async Task<Unit> DeleteUserByPhoneAsync(string phoneNumber, CancellationToken cancellationToken)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.PhoneNumber == phoneNumber, cancellationToken);
            if (user != null)
            {
                _context.Users.Remove(user);
                await _context.SaveChangesAsync(cancellationToken);
            }

            return Unit.Value;
        }

        public async Task<Unit> UpdateUserAsync(int userId, string firstName, string lastName, string phoneNumber, CancellationToken cancellationToken)
        {
            var user = await _context.Users.FindAsync(userId);

            if (user == null)
            {
                throw new Exception("User not found.");
            }

            // Check if the new phone number is already associated with another user
            var existingUserWithPhoneNumber = await _context.Users.FirstOrDefaultAsync(u => u.PhoneNumber == phoneNumber && u.Id != userId, cancellationToken);
            if (existingUserWithPhoneNumber != null)
            {
                throw new Exception("Phone number is already associated with another user.");
            }

            user.FirstName = firstName;
            user.LastName = lastName;
            user.PhoneNumber = phoneNumber;

            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }

    }
}

