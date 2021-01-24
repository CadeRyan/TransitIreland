using System;
using System.Collections.Generic;
using System.Text;

namespace TransitIrelandApp
{
    [Serializable]
    public class BusStop
    {
        public string Id { get; set; }
        public string Address { get; set; }
        public double Lat { get; set; }
        public double Lng { get; set; }

        public List<RealtimeResult> RealtimeResults { get; set; }

        public BusStop()
        {
            RealtimeResults = new List<RealtimeResult>();
        }
    }

    [Serializable]
    public class RealtimeResult
    {
        public string Destination { get; set; }
        public string RouteId { get; set; }
        public DateTime DueAt { get; set; }
        public string Agency { get; set; }
        //public Dictionary<string, StopOnTrip> StopsVisited { get; set; }

        public RealtimeResult(string destination, string routeId, string agency)
        {
            Destination = destination;
            RouteId = routeId;
            Agency = agency;

           // StopsVisited = new Dictionary<string, StopOnTrip>();
        }
    }

    [Serializable]
    public class StopOnTrip
    {
        public double Lat { get; set; }
        public double Lng { get; set; }
        public bool Alighted { get; set; }
        public StopOnTrip(double lat, double lng, bool alighted)
        {
            Lat = lat;
            Lng = lng;
            Alighted = alighted;
        }
    }
}
