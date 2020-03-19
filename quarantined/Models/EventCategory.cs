using System;
using System.Collections.Generic;

namespace quarantined.Models
{
    public partial class EventCategory
    {
        public Guid Id { get; set; }
        public Guid? IdEvent { get; set; }
        public Guid? IdCategory { get; set; }

        public virtual CatCategory IdCategoryNavigation { get; set; }
        public virtual Event IdEventNavigation { get; set; }
    }
}
