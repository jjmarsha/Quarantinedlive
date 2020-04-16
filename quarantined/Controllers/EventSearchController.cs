using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CommonQ.Mocks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using quarantined.Services;

namespace quarantined.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventSearchController : ControllerBase
    {
        public readonly EventServiceAgent _EventServiceAgent;

        public EventSearchController()
        {
            _EventServiceAgent = new EventServiceAgent();
        }
        // GET: api/EventSearch
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/EventSearch/5
        [HttpGet("{mode}", Name = "GetSearch")]
        public async Task<IActionResult> Get(string mode, [FromQuery] string keywords)
        {
            var Search = _EventServiceAgent.GetAll();
            var filter = new List<EventBody>();
            if (!keywords.Contains(","))
            {
                switch (mode)
                {
                    case "title":
                        filter = Search.Where(o => o.title == keywords).ToList();
                        break;
                    case "category":
                        filter = Search.Where(o => o.category == keywords).ToList();
                        break;
                    case "emailhost":
                        filter = Search.Where(o => o.email_of_host == keywords).ToList();
                        break;
                    case "language":
                        filter = Search.Where(o => o.language == keywords).ToList();
                        break;
                    default:
                        return BadRequest("Mode not found");
                }
            }
            else
            {
                var tosearch = keywords.Split(",");
                switch (mode)
                {
                    case "title":
                        filter = Search.Where(o => tosearch.Contains(o.title)).ToList();
                        break;
                    case "category":
                        filter = Search.Where(o => tosearch.Contains(o.category)).ToList();
                        break;
                    case "emailhost":
                        filter = Search.Where(o => tosearch.Contains(o.email_of_host)).ToList();
                        break;
                    case "language":
                        filter = Search.Where(o => tosearch.Contains(o.language)).ToList();
                        break;
                    default:
                        return BadRequest("Mode not found");
                }
            }


            return Ok(filter);
        }

        // POST: api/EventSearch
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/EventSearch/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
