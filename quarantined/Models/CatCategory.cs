using System;
using System.Collections.Generic;

namespace quarantined.Models
{
    public partial class CatCategory
    {
        public CatCategory()
        {
            EventCategory = new HashSet<EventCategory>();
        }

        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Info { get; set; }

        public virtual ICollection<EventCategory> EventCategory { get; set; }
    }
}
