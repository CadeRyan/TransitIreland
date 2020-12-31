using Microsoft.AspNetCore.Mvc;
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
    public class InstanceTestController : ControllerBase
    {
        [HttpGet]
        public string Get()
        {
            int content = Int32.Parse(System.IO.File.ReadAllText(Path.Combine(Environment.CurrentDirectory, @"Files\", "test.txt")));
            System.IO.File.WriteAllText(Path.Combine(Environment.CurrentDirectory, @"Files\", "test.txt"), (content+1).ToString());
            return content.ToString();
        }
    }
}
