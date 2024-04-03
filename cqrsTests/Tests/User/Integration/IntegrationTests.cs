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

namespace cqrsTests.Tests.User.Integration
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
            var command = new CreateUserCommand { FirstName = "a", LastName = "b", PhoneNumber = "1234567891" };
            var content = new StringContent(JsonConvert.SerializeObject(command), Encoding.UTF8, "application/json");

            // Act
            var response = await client.PostAsync("/api/user", content);

            // Assert
            response.EnsureSuccessStatusCode(); // Status Code 200-299
        }

        [Fact]
        public async Task UpdateUser_ExistingUser_ReturnsNoContent()
        {
            // Arrange
            var client = _factory.CreateClient();
            var id = 2; 
            var command = new UpdateUserCommand { Id = id, FirstName = "a", LastName = "b", PhoneNumber = "1234567891" };
            var content = new StringContent(JsonConvert.SerializeObject(command), Encoding.UTF8, "application/json");

            // Act
            var response = await client.PutAsync($"/api/user/{id}", content);

            // Assert
            response.EnsureSuccessStatusCode(); // Status Code 200-299
        }

        [Fact]
        public async Task DeleteUser_WhenUserExists_ReturnsNoContent()
        {
            // Arrange
            var client = _factory.CreateClient();
            var userId = 1; // Assuming this is a valid user id that exists in the database
            var requestUri = $"/api/user/id/{userId}";

            // Act
            var response = await client.DeleteAsync(requestUri);

            // Assert
            response.EnsureSuccessStatusCode();
        }

        [Fact]
        public async Task DeleteUserByPhoneNumber_WhenUserExists_ReturnsNoContent()
        {
            // Arrange
            var client = _factory.CreateClient();
            var phoneNumber = "1234567891"; 
            var requestUri = $"/api/user/phoneNumber/{phoneNumber}";

            // Act
            var response = await client.DeleteAsync(requestUri);

            // Assert
            response.EnsureSuccessStatusCode();
        }


        

    }
}
