using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
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
    [Route("api/[controller]")]
    public class WebRequestController : ControllerBase
    {
        [HttpGet]
        public string Get()
        {
            return 4934 + "";
        }
    }
}
