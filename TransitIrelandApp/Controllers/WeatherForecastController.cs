using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ProtoBuf;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using TransitRealtime;

namespace TransitIrelandApp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<WeatherForecastController> _logger;

        public WeatherForecastController(ILogger<WeatherForecastController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public string Get()
        {
            Console.WriteLine("ENTERED 1");
            WebRequest request = WebRequest.Create("https://gtfsr.transportforireland.ie/v1/");
            request.Headers["Cache-Control"] = "no-cache";
            request.Headers["x-api-key"] = "3fca6259b9814bef8e7a22ea63bdd1ce";

            FeedMessage feed = Serializer.Deserialize<FeedMessage>(request.GetResponse().GetResponseStream());


            Console.WriteLine("RETURN 1", feed.Entities.Count());
            return feed.Entities.Count() + "";
        }
    }
}
