using System;
using System.Collections.Generic;
using System.Text;

namespace TransitIrelandApp.GTFSobjects
{
    [Serializable]
    public class StopTimeSet
    {
        public string id { get; set; }

        public HashSet<StopTimeReduced> Stops { get; set; }

        public StopTimeSet()
        {
            Stops = new HashSet<StopTimeReduced>();
        }
    }

    [Serializable]
    public class StopTimeReduced
    {
        public string StopId { get; set; }
        public string ArrivalTime { get; set; }
        public double ShapeDistTraveled { get; set; }

        public StopTimeReduced(string stopId, string arrivalTime, double shapeDistTraveled)
        {
            StopId = stopId;
            ArrivalTime = arrivalTime;
            ShapeDistTraveled = shapeDistTraveled;
        }
    }

}
