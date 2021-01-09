using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using ProtoBuf;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using TransitIrelandApp.GTFSobjects;
using TransitRealtime;

namespace TransitIrelandApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class WebRequestController : ControllerBase
    {
        [HttpGet]
        public string Get()
        {
            HashSet<StopTimeSet> data = JsonConvert.DeserializeObject<HashSet<StopTimeSet>>(System.IO.File.ReadAllText(Path.Combine(Environment.CurrentDirectory, "BusRealtime.json")));
            return data.Count + "";
        }
    }
}
