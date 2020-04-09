using System;
using System.Collections.Generic;
using System.Text;

namespace CommonQ.Mocks
{
    public class EventBody
    {
        public Guid Id { get; set; }
        public string title { get; set; }
        public string nameofhost { get; set; }
        public string email_of_host { get; set; }
        public string[] topics { get; set; }
        public string category { get; set; }
        public string link { get; set; }
        public string language { get; set; }
        public string time { get; set; }
        public string description { get; set; }
        public string image_url { get; set; }
        public string Type { get; set; }
    }
}
