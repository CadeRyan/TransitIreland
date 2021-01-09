using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TransitIrelandApp.GTFSobjects
{
    public class StopTime
    {
        public string trip_id { get; set; }
        public string arrival_time { get; set; }
        public string departure_time { get; set; }
        public string stop_id { get; set; }
        public int stop_sequence { get; set; }
        public string stop_headsign { get; set; }
        public string pickup_type { get; set; }
        public string drop_off_type { get; set; }
        public double shape_dist_traveled { get; set; }
    }
}
