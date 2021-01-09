using Ionic.Zip;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using CsvHelper;
using System.Net;
using System.Globalization;
using TransitIrelandApp.GTFSobjects;
using TransitIrelandApp.GTFSObjects;
using System.Threading.Tasks;
using Microsoft.Azure.Cosmos;

namespace TransitIrelandApp
{
    public static class GTFS_static
    {
        public static void PeriodicallyUpdateGtfsSData()
        {
            //sort this out
        }

        public static void UpdateGtfsSData()
        {
            using (var client = new WebClient())
            {
                client.DownloadFile("https://www.transportforireland.ie/transitData/google_transit_combined.zip", "GTFS.zip");
            }

            using (ZipFile zip = ZipFile.Read(Path.Combine(Environment.CurrentDirectory, @"GTFS.zip")))
            {
                zip.ExtractAll(Path.Combine(Environment.CurrentDirectory, @"GTFSfiles"), ExtractExistingFileAction.OverwriteSilently);
            }

            
        }
    }
}
