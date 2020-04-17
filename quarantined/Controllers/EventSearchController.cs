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
            var tokill = "as, I, his, that, he, was, for, on, are, with, they, be, at, one, have, this, from, by, but, what, some, is, it, you, or, had, the, of, to, and, a, in, we, can, were, which, do, their, if, will, how, said, an, each";
            var arr = tokill.Split(",");
            var Search = _EventServiceAgent.GetAll();
            var filter = new List<EventBody>();
            if (!keywords.Contains(","))
            {
                switch (mode)
                {
                    case "title":
                        filter = Search.Where(o => o.title.Contains(keywords)).ToList();
                        break;
                    case "category":
                        filter = Search.Where(o => o.category.Contains(keywords)).ToList();
                        break;
                    case "emailhost":
                        filter = Search.Where(o => o.email_of_host.Contains(keywords)).ToList();
                        break;
                    case "language":
                        filter = Search.Where(o => o.language.Contains(keywords)).ToList();
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
