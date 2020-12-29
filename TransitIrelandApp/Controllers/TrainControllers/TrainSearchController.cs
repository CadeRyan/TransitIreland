using System;
using System.Collections.Generic;
using System.IO;
using EnrouteAPI.Train;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace EnrouteAPI.Controllers.TrainControllers
{
    [Route("api/[controller]")]
    public class TrainSearchController : Controller
    {
        // GET api/<controller>/5
        [HttpGet("{id}")]
        public string Get(string id)
        {
            var allTrainStations = AllTrainStations.FromJson(System.IO.File.ReadAllText(Path.Combine(Environment.CurrentDirectory, @"Files\", "AllTrainStations.json")));
            List<TrainStation> list = new List<TrainStation>();

            foreach (TrainStation station in allTrainStations.Stations)
            {
                if (station.Name.ToLower().StartsWith(id.ToLower()))
                {
                    list.Add(station);
                }
            }

            list.Sort(
                delegate (TrainStation a, TrainStation b)
                {
                    return a.Name.CompareTo(b.Name);
                });

            return JsonConvert.SerializeObject(list, Formatting.Indented);
        }
    }
}
