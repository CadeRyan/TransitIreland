using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TransitIrelandApp.GTFSObjects
{
    [Serializable]
    public class Trip
    {
        public string route_id { get; set; }
        public string service_id { get; set; }
        public string trip_id { get; set; }
        public string shape_id { get; set; }
        public string trip_headsign { get; set; }
        public string direction_id { get; set; }
    }
}
