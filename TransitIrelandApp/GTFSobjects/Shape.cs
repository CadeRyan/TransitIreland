using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TransitIrelandApp.GTFSObjects
{
    [Serializable]
    public class Shape
    {
        public string shape_id { get; set; }
        public double shape_pt_lat { get; set; }
        public double shape_pt_lon { get; set; }
        public int shape_pt_sequence { get; set; }
        public double shape_dist_traveled { get; set; }
    }
}
