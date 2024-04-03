using System;
using cqrsVerticalSlices.Functionalities.User.Commands.Mutations;
using cqrsVerticalSlices.Functionalities.User.Dto;
using cqrsVerticalSlices.Models;
using MediatR;

namespace cqrsVerticalSlices.Functionalities.User.Repository
{
    public interface IUserRepository
    {
        Task<UserEntity?> GetByIdAsync(int id);
        Task<UserEntity?> GetByPhoneNumberAsync(string phoneNumber);
        Task<UserResultDto> GetUsersAsync(int pageNumber, int pageSize, CancellationToken cancellationToken);
        Task<Unit> CreateUserAsync(CreateUserCommand request, CancellationToken cancellationToken);
    }   
}

