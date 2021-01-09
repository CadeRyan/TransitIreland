using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TransitIrelandApp.GTFSObjects
{
    [Serializable]
    public class Stop
    {
        public string stop_id { get; set; }
        public string stop_name { get; set; }
        public double stop_lat { get; set; }
        public double stop_lon { get; set; }
    }
}
