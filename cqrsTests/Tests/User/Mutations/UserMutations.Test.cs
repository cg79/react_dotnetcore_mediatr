using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using cqrsTests.Tests.Mock;
using cqrsVerticalSlices.Functionalities.User.Commands.Mutations;
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
        public async Task Handle_UniquePhoneNumber_AddsUserToDatabase()
        {
            // Arrange
            var userEntity = new UserEntity { Id = 1, FirstName = "a", LastName = "b", PhoneNumber = "c" };

            var dbContextMock = new Mock<IDataContext>();
            dbContextMock.Setup(m => m.Users)
                .Returns(DbMocks.MockDbSet(userEntity));

            var command = new CreateUserCommand
            {
                FirstName = "John",
                LastName = "Doe",
                PhoneNumber = "1234567890"
            };
            var handler = new CreateUserCommandHandler(dbContextMock.Object);

            // Act
            await handler.Handle(command, CancellationToken.None);

            // Assert
            dbContextMock.Verify(c => c.SaveChangesAsync(CancellationToken.None), Times.Once);
            Assert.Single(dbContextMock.Object.Users);
        }

        [Fact]
        public async Task Handle_DuplicatePhoneNumber_ThrowsException()
        {
            var userEntity = new UserEntity { Id = 1, FirstName = "a", LastName = "b", PhoneNumber = "1234567890" };

            var dbContextMock = new Mock<IDataContext>();
            dbContextMock.Setup(m => m.Users)
                .Returns(DbMocks.MockDbSet(userEntity));


            var command = new CreateUserCommand
            {
                FirstName = "John",
                LastName = "Doe",
                PhoneNumber = "1234567890"
            };
            var handler = new CreateUserCommandHandler(dbContextMock.Object);

            // Act & Assert
            var exception = await Assert.ThrowsAsync<Exception>(() => handler.Handle(command, CancellationToken.None));
            Assert.Equal("Contact already exists.", exception.Message);
            dbContextMock.Verify(c => c.SaveChangesAsync(CancellationToken.None), Times.Never);
        }
    }

    
}
