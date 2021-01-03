using Newtonsoft.Json;
using ProtoBuf;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using TransitRealtime;

namespace TransitIrelandApp
{
    public static class GTFS_realtime
    {
        public static void UpdateGTFSInformation()
        {
            WebRequest request = WebRequest.Create("https://gtfsr.transportforireland.ie/v1/");
            request.Headers["Cache-Control"] = "no-cache";
            request.Headers["x-api-key"] = "3fca6259b9814bef8e7a22ea63bdd1ce";

            FeedMessage feed = Serializer.Deserialize<FeedMessage>(request.GetResponse().GetResponseStream());

            File.WriteAllText(Path.Combine(Environment.CurrentDirectory, @"Files\", "GTFS.json"), JsonConvert.SerializeObject(feed));
            UpdateBusRealtimeData(feed);
        }

        public static void UpdateBusRealtimeData(FeedMessage feed)
        {
        }
    }
}
