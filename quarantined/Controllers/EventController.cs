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
    public class EventController : ControllerBase
    {
        public readonly EventServiceAgent _EventServiceAgent;
        public EventController()
        {
            _EventServiceAgent = new EventServiceAgent();
        }
        // GET: api/Event
        [HttpGet]
        public IActionResult Get()
        {
            var allEvents = _EventServiceAgent.GetAll();
            return Ok(allEvents);
        }

        // GET: api/Event/5
        [HttpGet("{id}", Name = "Get")]
        public IActionResult Get(string id)
        {
            var allEvents = _EventServiceAgent.GetById(Guid.Parse(id));
            return Ok(allEvents);
        }

        // POST: api/Event
        [HttpPost]
        public IActionResult Post([FromBody] EventBody value)
        {
            try
            {
                value.Id = Guid.NewGuid();
                if (_EventServiceAgent.Save(value))
                {
                    return StatusCode(202,_EventServiceAgent);
                }
                else
                {
                    return BadRequest("Error on create event");
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return StatusCode(500, "Panic!!!!!!!!");
            }
        }

        // PUT: api/Event/5
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
