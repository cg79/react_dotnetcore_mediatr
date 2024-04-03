using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using cqrsTests.Tests.Mock;
using cqrsVerticalSlices.Functionalities.User.Commands.Mutations;
using cqrsVerticalSlices.Functionalities.User.Repository;
using cqrsVerticalSlices.Models;
using cqrsVerticalSlices.Mutations;
using cqrsVerticalSlices.Queries;
using CQRSVerticalSlices.Data;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Moq;
using Xunit;

namespace cqrsTests.Tests.User.Mutations
{
    public class CreateUserCommandHandlerTests
    {
        [Fact]
        public async Task Handle_ValidRequest_ReturnsUnit()
        {
            // Arrange
            var userRepositoryMock = new Mock<IUserRepository>();
            userRepositoryMock.Setup(repo => repo.CreateUserAsync(It.IsAny<CreateUserCommand>(), CancellationToken.None))
                              .ReturnsAsync(Unit.Value);
            var handler = new CreateUserCommandHandler(userRepositoryMock.Object);
            var request = new CreateUserCommand
            {
                FirstName = "John",
                LastName = "Doe",
                PhoneNumber = "1234567890"
            };

            // Act
            var result = await handler.Handle(request, CancellationToken.None);

            // Assert
            Assert.Equal(Unit.Value, result);
            userRepositoryMock.Verify(repo => repo.CreateUserAsync(request, CancellationToken.None), Times.Once);
        }

        [Fact]
        public async Task Handle_DuplicatePhoneNumber_ThrowsException()
        {
            // Arrange
            var userRepositoryMock = new Mock<IUserRepository>();
            userRepositoryMock.Setup(repo => repo.CreateUserAsync(It.IsAny<CreateUserCommand>(), CancellationToken.None))
                              .ThrowsAsync(new Exception("Contact already exists."));
            var handler = new CreateUserCommandHandler(userRepositoryMock.Object);
            var request = new CreateUserCommand
            {
                FirstName = "John",
                LastName = "Doe",
                PhoneNumber = "1234567890"
            };

            // Act & Assert
            await Assert.ThrowsAsync<Exception>(() => handler.Handle(request, CancellationToken.None));
            userRepositoryMock.Verify(repo => repo.CreateUserAsync(request, CancellationToken.None), Times.Once);
        }
    }


}
