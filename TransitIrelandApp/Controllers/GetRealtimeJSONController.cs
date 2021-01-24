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
        public dynamic Post([FromBody] dynamic content)
        {
            //JObject jObject = JObject.Parse(content);
            //string title = (string)jObject["title"];
            //Dictionary<string, object> obj = JsonConvert.DeserializeObject<Dictionary<string, object>>(Convert.ToString(content));
            //return (string)obj["title"];



            return content;
        }
    }
}
