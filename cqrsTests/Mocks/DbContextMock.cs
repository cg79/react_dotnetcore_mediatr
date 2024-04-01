using System;
using cqrsVerticalSlices.Models;
using Moq;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace cqrsTests.Mocks
{
	public static class DbContextMock
	{
        //public static Mock<DbContext> GetDbContext()
        //{
        //    IList<UserEntity> todoLists = new List<UserEntity>
        //    {
        //        new UserEntity{ Id = 1, FirstName = "person 1", LastName=".", PhoneNumber="1"},
        //        new UserEntity{ Id = 2, FirstName = "person 2", LastName=".", PhoneNumber="2"}
        //    };
        //    var mockDbContext = new Mock<IDbContext>();
        //    mockDbContext.Setup(c => c.TodoLists).Returns(todoLists);
        //    return mockDbContext;
        //}
    }
}

