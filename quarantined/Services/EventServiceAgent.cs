using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CommonQ.Mocks;
using Newtonsoft.Json;

namespace quarantined.Services
{
    public class EventServiceAgent
    {
        public bool Save(EventBody userData)
        {
            try
            {
                //var filePath = @"/app/eventMocks.json"; only if run in dockers
                var filePath = @"eventMocks.json";
                var jsonData = System.IO.File.ReadAllText(filePath);
                var userList = JsonConvert.DeserializeObject<List<EventBody>>(jsonData) ?? new List<EventBody>();
                userList.Add(userData);
                jsonData = JsonConvert.SerializeObject(userList);
                System.IO.File.WriteAllText(filePath, jsonData);
                return true;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return false;
            }
        }
        public List<EventBody> GetAll()
        {
            try
            {
                //var filePath = @"/app/eventMocks.json"; only if run in dockers
                var filePath = @"eventMocks.json";
                var jsonData = System.IO.File.ReadAllText(filePath);
                var userList = JsonConvert.DeserializeObject<List<EventBody>>(jsonData) ?? new List<EventBody>();
                return userList;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }
        public EventBody GetById(Guid id)
        {
            try
            {
                //var filePath = @"/app/eventMocks.json"; only if run in dockers
                var filePath = @"eventMocks.json";
                var jsonData = System.IO.File.ReadAllText(filePath);
                var userList = JsonConvert.DeserializeObject<List<EventBody>>(jsonData) ?? new List<EventBody>();
                var found = userList.FirstOrDefault(o => o.Id == id);
                return found;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

    }
}
