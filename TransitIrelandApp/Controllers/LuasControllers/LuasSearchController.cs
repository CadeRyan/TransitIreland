using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using EnrouteAPI.LUAS.Input;
using System.IO;
using Newtonsoft.Json;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace EnrouteAPI.Controllers.LuasControllers
{
    [Route("api/[controller]")]
    public class LuasSearchController : ControllerBase
    {
        [HttpGet("{id}")]
        public string Get(string id)
        {
            var allLuasStops = AllLuasStops.FromJson(System.IO.File.ReadAllText(Path.Combine(Environment.CurrentDirectory, @"Files\", "AllLuasStops.json")));
            List<LuasStop> list = new List<LuasStop>();

            foreach (LuasStop stop in allLuasStops.Stops)
            {
                if (stop.Text.ToLower().StartsWith(id.ToLower()))
                {
                    list.Add(stop);
                }
            }

            list.Sort(
                delegate (LuasStop a, LuasStop b)
                {
                    return a.Text.CompareTo(b.Text);
                });

            return JsonConvert.SerializeObject(list, Formatting.Indented);
        }
    }
}
