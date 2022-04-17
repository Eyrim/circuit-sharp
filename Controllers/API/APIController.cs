using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Server.IIS.Core;
using CircuitSharp.Util;
using System.Collections.Generic;
using System.IO;
using Microsoft.AspNetCore.Http;

namespace CircuitSharp.Controllers.API
{
    public class APIController : Controller
    {
        // POST: API/PlaceComponent?typeID=&parentElementID=
        [HttpPost]
        public void PlaceComponent(string typeID, string parentElementID) //TODO: Add Grid functionality
        {
            FileHandling.AppendToFile(typeID, @"C:\Users\gamin\Desktop\circuit-sharp\output.txt");
            FileHandling.AppendToFile(parentElementID, @"C:\Users\gamin\Desktop\circuit-sharp\output.txt");
        }
    }
}
