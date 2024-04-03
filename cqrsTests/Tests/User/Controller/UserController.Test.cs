using System.Threading.Tasks;
using cqrsVerticalSlices.Functionalities.User.Commands.Mutations;
using cqrsVerticalSlices.Functionalities.User.Commands.Queries;
using cqrsVerticalSlices.Models;
using cqrsVerticalSlices.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Xunit;

namespace cqrsTests.Tests.User.Controller
{
    public class UserControllerTests
    {
        [Fact]
        public async Task CreateUser_ReturnsCreatedAtAction()
        {
            // Arrange
            var mockMediator = new Mock<IMediator>();
            mockMediator
                .Setup(m => m.Send(It.IsAny<CreateUserCommand>(), default))
                .Returns(Task.FromResult(Unit.Value));

            var controller = new UserController(mockMediator.Object);
            var createUserCommand = new CreateUserCommand { FirstName="a", LastName="b", PhoneNumber="111" };

            // Act
            var result = await controller.CreateUser(createUserCommand) as CreatedAtActionResult;

            // Assert
            Assert.NotNull(result);
            Assert.Equal(nameof(UserController.GetUser), result.ActionName);
            Assert.Equal(createUserCommand, result.Value);
        }

        [Fact]
        public async Task UpdateUser_ValidId_ReturnsNoContent()
        {
            // Arrange
            var mockMediator = new Mock<IMediator>();
            var controller = new UserController(mockMediator.Object);
            var id = 5; // Assuming valid user ID
            var updateUserCommand = new UpdateUserCommand { Id = id, FirstName = "a", LastName = "b", PhoneNumber = "111" };

            // Act
            var result = await controller.UpdateUser(id, updateUserCommand) as NoContentResult;

            // Assert
            Assert.NotNull(result);
            Assert.Equal(204, result.StatusCode);
        }

    }
}
