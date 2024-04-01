using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using cqrsVerticalSlices.Functionalities.User.Commands.Mutations;
using cqrsVerticalSlices.Models;
using cqrsVerticalSlices.Queries;
using CQRSVerticalSlices;
using Microsoft.AspNetCore.Mvc.Testing;
using Newtonsoft.Json;
using Xunit;

namespace YourNamespace.IntegrationTests
{
    public class UserControllerIntegrationTests1 : IClassFixture<WebApplicationFactory<Startup>>
    {
        private readonly WebApplicationFactory<Startup> _factory;

        public UserControllerIntegrationTests1(WebApplicationFactory<Startup> factory)
        {
            _factory = factory;
        }

        [Fact]
        public async Task CreateUser_ReturnsCreatedAtAction()
        {
            // Arrange
            var client = _factory.CreateClient();
            var command = new CreateUserCommand { FirstName="a", LastName="b", PhoneNumber="1" };
            var content = new StringContent(JsonConvert.SerializeObject(command), Encoding.UTF8, "application/json");

            // Act
            var response = await client.PostAsync("/api/user", content);

            // Assert
            response.EnsureSuccessStatusCode(); // Status Code 200-299
            Assert.Equal(HttpStatusCode.Created, response.StatusCode);
            // Additional assertions if needed
        }

        [Fact]
        public async Task UpdateUser_ExistingUser_ReturnsNoContent()
        {
            // Arrange
            var client = _factory.CreateClient();
            var id = 5; // Assuming there is an existing user with this ID
            var command = new UpdateUserCommand { Id = id, FirstName = "a", LastName = "b", PhoneNumber = "1"  };
            var content = new StringContent(JsonConvert.SerializeObject(command), Encoding.UTF8, "application/json");

            // Act
            var response = await client.PutAsync($"/api/user/{id}", content);

            // Assert
            response.EnsureSuccessStatusCode(); // Status Code 200-299
            Assert.Equal(HttpStatusCode.NoContent, response.StatusCode);
            // Additional assertions if needed
        }

        // Add more tests for other endpoints similarly
    }
}
