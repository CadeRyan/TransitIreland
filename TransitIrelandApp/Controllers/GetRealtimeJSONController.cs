using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using ProtoBuf;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using TransitRealtime;

namespace TransitIrelandApp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class GetRealtimeJSONController : ControllerBase
    {
        [HttpPost]
        public string Post([FromBody] Dictionary<string, BusStop> content)
        {
            System.IO.File.WriteAllText(Path.Combine(Environment.CurrentDirectory, "BusRealtime.json"), JsonConvert.SerializeObject(content));

            return "update received";
        }

        [HttpGet]
        public string Get()
        {
            return System.IO.File.ReadAllText(Path.Combine(Environment.CurrentDirectory, "BusRealtime.json"));
        }
    }
}
