using CsvHelper;
using Microsoft.Azure.Cosmos;
using Newtonsoft.Json;
using ProtoBuf;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using TransitIrelandApp.GTFSobjects;
using TransitIrelandApp.GTFSObjects;
using TransitRealtime;

namespace TransitIrelandApp
{
    public static class GTFS_realtime
    {
        public static FeedMessage Feed { get; set; }
        public static FeedResponse<StopTimeSet> DataBaseResults { get; set; }
        public static HashSet<StopTimeSet> AllStopTimeSets { get; set; }
        public static FeedIterator<StopTimeSet> QueryResultSetIterator { get; set; }

        public static void UpdateGtfsRData()
        {
            while (true)
            {
                PerformUpdate().Wait();
                Thread.Sleep(10*1000);
            }
        }

        public static async Task PerformUpdate()
        {
            WebRequest request = WebRequest.Create("https://gtfsr.transportforireland.ie/v1/");
            request.Headers["Cache-Control"] = "no-cache";
            request.Headers["x-api-key"] = "3fca6259b9814bef8e7a22ea63bdd1ce";

            Feed = new FeedMessage();
            Feed = Serializer.Deserialize<FeedMessage>(request.GetResponse().GetResponseStream());

            string cosmosUrl = "https://transitirelanddb.documents.azure.com:443/";
            string cosmosKey = "GKfMr9ye50PWrQTUncFlIby5pfNszL9WibUVpePjKaTri4PuUqXjCVK7CUygj4VsuFUmgxuAGjWl00KVu6wBYg==";
            string databaseName = "TransitIreland";
            string containerName = "StopTimes";
            string partitionKeyPath = "/FirstStop";

            CosmosClient client = new CosmosClient(cosmosUrl, cosmosKey);
            Database db = await client.CreateDatabaseIfNotExistsAsync(databaseName);
            Container container = await db.CreateContainerIfNotExistsAsync(containerName, partitionKeyPath, 400);

            string sqlQueryText = $"SELECT * FROM c WHERE c.id IN ({MakeList()})";

            QueryDefinition queryDefinition = new QueryDefinition(sqlQueryText);
            QueryResultSetIterator = container.GetItemQueryIterator<StopTimeSet>(queryDefinition);

            DataBaseResults = await QueryResultSetIterator.ReadNextAsync();

            AllStopTimeSets = new HashSet<StopTimeSet>();
            foreach (StopTimeSet result in DataBaseResults)
            {
                AllStopTimeSets.Add(result);
            }

            File.WriteAllText(Path.Combine(Environment.CurrentDirectory, "BusRealtime.json"), JsonConvert.SerializeObject(AllStopTimeSets));
        }

        public static string MakeList()
        {
            var tripIds = Feed.Entities.Select(x => $"'{x.TripUpdate.Trip.TripId}'").ToArray();
            return string.Join(",", tripIds);
        }
    }
}
