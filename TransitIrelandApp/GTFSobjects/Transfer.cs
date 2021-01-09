using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TransitIrelandApp.GTFSObjects
{
    [Serializable]
    public class Transfer
    {
        public string from_stop_id { get; set; }
        public string to_stop_id { get; set; }
        public string transfer_type { get; set; }
        public string min_transfer_time { get; set; }
    }
}
