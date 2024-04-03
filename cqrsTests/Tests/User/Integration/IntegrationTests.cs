using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using cqrsTests.Tests.User.Helpers;
using cqrsVerticalSlices.Functionalities.User.Commands.Mutations;
using cqrsVerticalSlices.Functionalities.User.Commands.Queries;
using cqrsVerticalSlices.Models;
using cqrsVerticalSlices.Queries;
using CQRSVerticalSlices;
using Microsoft.AspNetCore.Mvc.Testing;
using Newtonsoft.Json;
using Xunit;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace cqrsTests.Tests.User.Integration
{
    public class UserControllerIntegrationTests : IClassFixture<WebApplicationFactory<Startup>>
    {
        private readonly WebApplicationFactory<Startup> _factory;
        private string phoneNumber = "";

        public UserControllerIntegrationTests(WebApplicationFactory<Startup> factory)
        {
            _factory = factory;
        }

        private async Task<dynamic?> GetUserByPhoneNumber(string phoneNumber)
        {
            var client = _factory.CreateClient();

            var response = await client.GetAsync($"/api/user/phoneNumber?phoneNumber={phoneNumber}");

            var responseContent = await response.Content.ReadAsStringAsync();
            var jsonResponse = JsonConvert.DeserializeObject(responseContent) as dynamic;
            return jsonResponse;
        }

        private async Task<dynamic?> CreateUser(CreateUserCommand command)
        {
            
            var client = _factory.CreateClient();
            var content = new StringContent(JsonConvert.SerializeObject(command), Encoding.UTF8, "application/json");

            var response = await client.PostAsync("/api/user", content);

            var responseContent = await response.Content.ReadAsStringAsync();
            var jsonResponse = JsonConvert.DeserializeObject(responseContent) as dynamic;

            return jsonResponse;
        }

        [Fact]
        public async Task CreateUser_ReturnsCreatedAtAction()
        {
            var phoneNumberGenerator = new PhoneNumberGenerator();
            phoneNumber = phoneNumberGenerator.GeneratePhoneNumber();

            dynamic? jsonResponse = await CreateUser(new CreateUserCommand { FirstName = "a", LastName = "b", PhoneNumber = phoneNumber });

            dynamic? createUserJsonResponse = await GetUserByPhoneNumber(phoneNumber);

            // Assert
            Assert.True((bool)jsonResponse?.success);
            Assert.NotNull(createUserJsonResponse);
        }


        [Fact]
        public async Task UpdateExistingUser_ReturnsNoContent()
        {
            // Arrange
            var phoneNumberGenerator = new PhoneNumberGenerator();
            phoneNumber = phoneNumberGenerator.GeneratePhoneNumber();
            var client = _factory.CreateClient();
            dynamic? jsonResponse = await CreateUser(new CreateUserCommand { FirstName = "a", LastName = "b", PhoneNumber = phoneNumber });

            dynamic? createdUserJsonResponse = await GetUserByPhoneNumber(phoneNumber);

            var updatedUser = new UpdateUserCommand
            {
                Id = createdUserJsonResponse?.data.id,
                FirstName = "UpdatedFirstName",
                LastName = "UpdatedLastName",
                PhoneNumber = "1234567890"
            };

            var content = new StringContent(JsonConvert.SerializeObject(updatedUser), Encoding.UTF8, "application/json");

            // Act
            var response = await client.PutAsync($"/api/user/{createdUserJsonResponse?.data.id}", content);

            // Assert
            response.EnsureSuccessStatusCode();
        }


        [Fact]
        public async Task UpdateUser_ExistingUser_ReturnsNoContent()
        {
            var user = await GetUserByPhoneNumber(phoneNumber);
            // Arrange
            var client = _factory.CreateClient();
            var id = 2; 
            var command = new UpdateUserCommand { Id = id, FirstName = "a", LastName = "b", PhoneNumber = "1234567891" };
            var content = new StringContent(JsonConvert.SerializeObject(command), Encoding.UTF8, "application/json");

            // Act
            var response = await client.PutAsync($"/api/user/{id}", content);

            // Assert
            // Read response content
            var responseContent = await response.Content.ReadAsStringAsync();
            var jsonResponse = JsonConvert.DeserializeObject(responseContent) as dynamic;
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
