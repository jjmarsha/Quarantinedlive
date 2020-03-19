using System;
using System.Collections.Generic;

namespace quarantined.Models
{
    public partial class Event
    {
        public Event()
        {
            EventCategory = new HashSet<EventCategory>();
        }

        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Topic { get; set; }
        public string HostName { get; set; }
        public string Groupcall { get; set; }
        public string Link { get; set; }
        public string Language { get; set; }
        public string Date { get; set; }
        public string Time { get; set; }
        public string Description { get; set; }
        public DateTime? DateCreated { get; set; }

        public virtual ICollection<EventCategory> EventCategory { get; set; }
    }
}
