using System;
using cqrsVerticalSlices.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Moq;

namespace cqrsTests.Tests.Mock
{
	public static class DbMocks
	{
        public static DbSet<UserEntity> MockDbSet(UserEntity userEntity)
        {
            var data = new[] { userEntity };
            var mockSet = new Mock<DbSet<UserEntity>>();
            mockSet.As<IQueryable<UserEntity>>().Setup(m => m.Provider).Returns(data.AsQueryable().Provider);
            mockSet.As<IQueryable<UserEntity>>().Setup(m => m.Expression).Returns(data.AsQueryable().Expression);
            mockSet.As<IQueryable<UserEntity>>().Setup(m => m.ElementType).Returns(data.AsQueryable().ElementType);
            mockSet.As<IQueryable<UserEntity>>().Setup(m => m.GetEnumerator()).Returns(data.AsQueryable().GetEnumerator());
            return mockSet.Object;
        }
    }
}



