using Microsoft.AspNetCore.Mvc;
using ProtoBuf;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
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
            WebRequest request = WebRequest.Create("https://gtfsr.transportforireland.ie/v1/");
            request.Headers["Cache-Control"] = "no-cache";
            request.Headers["x-api-key"] = "3fca6259b9814bef8e7a22ea63bdd1ce";

            FeedMessage feed = Serializer.Deserialize<FeedMessage>(request.GetResponse().GetResponseStream());

            return feed.Entities.Count() + "";
        }
    }
}
