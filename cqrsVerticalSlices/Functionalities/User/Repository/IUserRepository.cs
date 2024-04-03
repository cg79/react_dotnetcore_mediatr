using System;
using cqrsVerticalSlices.Models;

namespace cqrsVerticalSlices.Functionalities.User.Repository
{
    public interface IUserRepository
    {
        Task<UserEntity?> GetByIdAsync(int id);
    }
}

