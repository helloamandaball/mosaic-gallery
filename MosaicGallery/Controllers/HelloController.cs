using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MosaicGallery.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HelloController : ControllerBase
    {
        [HttpGet]
        public IActionResult Hello()
        {
            return Content("hello");
        }

        [Authorize]
        [HttpGet("auth")]
        public IActionResult HelloAuth()
        {
            return Content("hello from an endpoint that requires auth");
        }
    }
}
