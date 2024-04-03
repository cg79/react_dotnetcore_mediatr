using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using MediatR;

namespace cqrsVerticalSlices.Filter
{
    

    public class CaptureResponseActionFilter : IAsyncActionFilter
    {
        private readonly IMediator _mediator;

        public CaptureResponseActionFilter(IMediator mediator)
        {
            _mediator = mediator;
        }

        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            try
            {
                // Execute action
                var resultContext = await next();

                // Capture response
                if (resultContext.Result is ObjectResult objectResult)
                {
                    var response = new
                    {
                        Success = true,
                        Data = objectResult.Value
                    };

                    // Return the captured response
                    resultContext.Result = new OkObjectResult(response);
                } else
                {

                    var errorResponse = new
                    {
                        Success = resultContext.Exception == null?  true: false,
                        Error = resultContext.Exception?.Message
                    };

                    resultContext.Exception = null;
                    // Return the error response
                    resultContext.Result = new OkObjectResult(errorResponse);
                    
                }
            }
            catch (Exception ex)
            {
                // Handle exceptions
                var errorResponse = new
                {
                    Success = false,
                    Error = ex.Message
                };

                // Return the error response
                context.Result = new OkObjectResult(errorResponse);
                
            }
        }
    }


}

