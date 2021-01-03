using GTFS;
using GTFS.Entities;
using GTFS.IO;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace TransitIrelandApp
{
    public static class GTFS_static
    {
        public static void UpdateGtfsSData()
        {
            using (var client = new WebClient())
            {
                client.DownloadFile("https://www.transportforireland.ie/transitData/google_transit_combined.zip", "GTFS.zip");
            }

            //using (ZipFile zip = ZipFile.Read(Path.Combine(Environment.CurrentDirectory, @"GTFS.zip")))
            //{
            //    zip.ExtractAll(Path.Combine(Environment.CurrentDirectory, @"GTFSjson"), ExtractExistingFileAction.OverwriteSilently);
            //}

            var reader = new GTFSReader<GTFSFeed>();
            var feed = reader.Read("GTFS.zip");

            Stopwatch sw = new Stopwatch();
            sw.Start();

            List<StopTime> stoptimes = feed.StopTimes.GetForTrip("18430.10892.2-761-ga2-1.345.I").ToList();
            foreach (StopTime stoptime in stoptimes)
            {
                if (stoptime.StopId.Equals("8230DB002125"))
                {
                    string shapedistance = stoptime.ShapeDistTravelled;
                    sw.Stop();
                    double time = sw.ElapsedMilliseconds;
                }
            }
        }
    }
}
