using cqrsVerticalSlices.Functionalities.User.Commands.Mutations;
using cqrsVerticalSlices.Functionalities.User.Commands.Queries;
using cqrsVerticalSlices.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
    private readonly IMediator _mediator;

    public UserController(IMediator mediator)
    {
        _mediator = mediator;
    }

    // POST api/user
    [HttpPost]
    public async Task<IActionResult> CreateUser([FromBody] CreateUserCommand command)
    {
        var userId = await _mediator.Send(command);
        return CreatedAtAction(nameof(GetUser), new { id = userId }, command);
    }

    // PUT api/user/5
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateUser(int id, [FromBody] UpdateUserCommand command)
    {
        if (id != command.Id)
        {
            return BadRequest();
        }

        await _mediator.Send(command);
        return NoContent();
    }

    [HttpDelete("id/{id}")]
    public async Task<IActionResult> DeleteUser(int id)
    {
        await _mediator.Send(new DeleteUserCommand { Id = id });
        return NoContent();
    }

    [HttpDelete("phoneNumber/{phoneNumber}")]
    public async Task<IActionResult> DeleteUserByPhoneNumber(string phoneNumber)
    {
        await _mediator.Send(new DeleteUserByPhoneCommand { PhoneNumber = phoneNumber });
        return NoContent();
    }



    // GET api/user/5
    [HttpGet("{id}")]
    public async Task<IActionResult> GetUser(int id)
    {
        var user = await _mediator.Send(new FindUserByIdQuery { Id = id });

        if (user == null)
        {
            return NotFound();
        }

        return Ok(user);
    }

    // GET api/user?phoneNumber=1234567890
    [HttpGet]
    public async Task<IActionResult> GetUserByPhoneNumber([FromQuery] string phoneNumber)
    {
        var user = await _mediator.Send(new FindUserByPhoneNumberQuery { PhoneNumber = phoneNumber });

        if (user == null)
        {
            return NotFound();
        }

        return Ok(user);
    }

    // GET api/user?pageNumber=1&pageSize=10
    [HttpGet("list")]
    public async Task<IActionResult> GetUsers([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10)
    {
        var users = await _mediator.Send(new GetUsersQuery { PageNumber = pageNumber, PageSize = pageSize });
        return Ok(users);
    }
}
