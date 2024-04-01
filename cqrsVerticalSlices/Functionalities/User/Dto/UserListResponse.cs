using System;
using cqrsVerticalSlices.Models;

namespace cqrsVerticalSlices.Functionalities.User.Dto
{
    public class UserResultDto
    {
        public required List<UserEntity> Users { get; set; }
        public int TotalCount { get; set; }
    }
}

