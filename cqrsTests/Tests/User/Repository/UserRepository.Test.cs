using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using cqrsVerticalSlices.Functionalities.User.Commands.Mutations;
using cqrsVerticalSlices.Functionalities.User.Dto;
using cqrsVerticalSlices.Functionalities.User.Repository;
using cqrsVerticalSlices.Models;
using CQRSVerticalSlices.Data;
using Microsoft.EntityFrameworkCore;
using Moq;
using Xunit;

namespace cqrsTests.Tests.User.Repository
{
    

    namespace YourNamespace.Tests.Functionalities.User.Repository
    {
        public class UserRepositoryTests
        {
            private readonly Mock<IDataContext> _contextMock;
            private readonly IUserRepository _userRepository;

            public UserRepositoryTests()
            {
                _contextMock = new Mock<IDataContext>();
                _userRepository = new UserRepository(_contextMock.Object);
            }

            [Fact]
            public async Task GetByIdAsync_ExistingId_ReturnsUser()
            {
                // Arrange
                var userId = 1;
                var userEntity = new UserEntity { Id = userId, FirstName = "John", LastName = "Doe", PhoneNumber = "1234567890" };
                var users = new List<UserEntity> { userEntity }.AsQueryable();

                _contextMock.Setup(m => m.Users).Returns(DbSetMock.Create(users));

                // Act
                var result = await _userRepository.GetByIdAsync(userId);

                // Assert
                Assert.NotNull(result);
                Assert.Equal(userId, result.Id);
                Assert.Equal(userEntity.FirstName, result.FirstName);
                Assert.Equal(userEntity.LastName, result.LastName);
                Assert.Equal(userEntity.PhoneNumber, result.PhoneNumber);
            }

            [Fact]
            public async Task GetByIdAsync_NonExistingId_ReturnsNull()
            {
                // Arrange
                var userId = 1;
                var users = new List<UserEntity>().AsQueryable();

                _contextMock.Setup(m => m.Users).Returns(DbSetMock.Create(users));

                // Act
                var result = await _userRepository.GetByIdAsync(userId);

                // Assert
                Assert.Null(result);
            }

            [Fact]
            public async Task GetByPhoneNumberAsync_ExistingPhoneNumber_ReturnsUser()
            {
                // Arrange
                var phoneNumber = "1234567890";
                var userEntity = new UserEntity { Id = 1, FirstName = "John", LastName = "Doe", PhoneNumber = phoneNumber };
                var users = new List<UserEntity> { userEntity }.AsQueryable();

                _contextMock.Setup(m => m.Users).Returns(DbSetMock.Create(users));

                // Act
                var result = await _userRepository.GetByPhoneNumberAsync(phoneNumber);

                // Assert
                Assert.NotNull(result);
                Assert.Equal(phoneNumber, result.PhoneNumber);
            }

            [Fact]
            public async Task GetByPhoneNumberAsync_NonExistingPhoneNumber_ReturnsNull()
            {
                // Arrange
                var phoneNumber = "1234567890";
                var users = new List<UserEntity>().AsQueryable();

                _contextMock.Setup(m => m.Users).Returns(DbSetMock.Create(users));

                // Act
                var result = await _userRepository.GetByPhoneNumberAsync(phoneNumber);

                // Assert
                Assert.Null(result);
            }

            // Add tests for other methods...
        }
    }

}

