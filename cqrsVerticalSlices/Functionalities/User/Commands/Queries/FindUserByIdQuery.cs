using System;
using cqrsVerticalSlices.Models;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading;
using System.Threading.Tasks;
using CQRSVerticalSlices.Data;


namespace cqrsVerticalSlices.Functionalities.User.Commands.Queries
{
    public class FindUserByIdQuery : IRequest<UserEntity>
    {
        public int Id { get; set; }
    }

}

