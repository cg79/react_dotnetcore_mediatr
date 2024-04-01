using cqrsTests.Mocks;
using cqrsTests.Tests.Mock;
using cqrsVerticalSlices.Functionalities.User.Commands.Queries;
using cqrsVerticalSlices.Models;
using cqrsVerticalSlices.Queries;
using CQRSVerticalSlices.Data;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Moq;
using System.Threading;
using System.Threading.Tasks;
using Xunit;

namespace cqrsTests.Tests.User.Queries
{

    public class UserQueries
    {
        [Fact]
        public async Task Handle_QueryById_ReturnsUserEntity()
        {
            // Arrange
            var userId = 1; // Mocked user id
            var query = new FindUserByIdQuery { Id = userId };
            var userEntity = new UserEntity { Id = 1, FirstName = "a", LastName = "b", PhoneNumber = "c" };

            var dbContextMock = new Mock<IDataContext>();
            dbContextMock.Setup(m => m.Users)
                .Returns(DbMocks.MockDbSet(userEntity));

            var handler = new FindUserByIdQueryHandler(dbContextMock.Object);

            // Act
            var result = await handler.Handle(query, CancellationToken.None);

            // Assert
            Assert.NotNull(result);
            Assert.Equal(userId, result.Id);
        }

        [Fact]
        public async Task Handle_QueryByNonExistentId_Returns_No_UserEntity()
        {
            // Arrange
            var query = new FindUserByIdQuery { Id = 5 };
            var userEntity = new UserEntity { Id = 1, FirstName = "a", LastName = "b", PhoneNumber = "c" };

            var dbContextMock = new Mock<IDataContext>();
            dbContextMock.Setup(m => m.Users)
                .Returns(DbMocks.MockDbSet(userEntity));

            var handler = new FindUserByIdQueryHandler(dbContextMock.Object);

            // Act
            var result = await handler.Handle(query, CancellationToken.None);

            // Assert
            Assert.Null(result);
        }

        [Fact]
        public async Task Handle_QueryByPhone_ReturnsUserEntity()
        {
            // Arrange
            var userId = 1; // Mocked user id
            var query = new FindUserByPhoneNumberQuery { PhoneNumber = "222" };
            var userEntity = new UserEntity { Id = 1, FirstName = "a", LastName = "b", PhoneNumber = "222" };

            var dbContextMock = new Mock<IDataContext>();
            dbContextMock.Setup(m => m.Users)
                .Returns(DbMocks.MockDbSet(userEntity));

            var handler = new FindUserByPhoneNumberQueryHandler(dbContextMock.Object);

            // Act
            var result = await handler.Handle(query, CancellationToken.None);

            // Assert
            Assert.NotNull(result);
            Assert.Equal(userId, result.Id);
        }

        [Fact]
        public async Task Handle_QueryByNonExistentPhone_ReturnsUserEntity()
        {
            // Arrange
            var query = new FindUserByPhoneNumberQuery { PhoneNumber = "not_exists" };
            var userEntity = new UserEntity { Id = 1, FirstName = "a", LastName = "b", PhoneNumber = "222" };

            var dbContextMock = new Mock<IDataContext>();
            dbContextMock.Setup(m => m.Users)
                .Returns(DbMocks.MockDbSet(userEntity));

            var handler = new FindUserByPhoneNumberQueryHandler(dbContextMock.Object);

            // Act
            var result = await handler.Handle(query, CancellationToken.None);

            // Assert
            Assert.Null(result);
        }

    }

}