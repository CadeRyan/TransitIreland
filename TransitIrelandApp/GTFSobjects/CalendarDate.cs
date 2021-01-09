using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TransitIrelandApp.GTFSObjects
{
    [Serializable]
    public class CalendarDate
    {
        public string service_id { get; set; }
        public string date { get; set; }
        public string exception_type { get; set; }
    }
}
