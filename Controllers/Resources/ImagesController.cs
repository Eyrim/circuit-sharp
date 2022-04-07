using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.IO;
using System.Threading.Tasks;

namespace CircuitSharp.Controllers
{
    public class ImagesController : Controller
    {
        private string GetImage(string name)
        {
            string dir = @$"GenericData/Imgs/{name}";

            // Combines the directory and the filename to make a proper path
            return Path.Combine(dir + ".png");
        }

        public ActionResult Index()
        {
            // HTTP 204 = no-content
                // Just to show the server is listening
            return StatusCode(204);
        }

        /// <summary>
        /// Serves image of a generic resistor
        /// </summary>
        /// <returns>ActionResult of a generic resistor image file</returns>
        //GET: Images/GenericResistor
        [HttpGet]
        public ActionResult GenericResistor()
        {
            return base.File(GetImage("genericResistor"), "image/png");
        }

        /// <summary>
        /// Serves image of a wire
        /// </summary>
        /// <returns>ActionResult of a wire image file</returns>
        //GET: Images/Wire
        [HttpGet]
        public ActionResult Wire()
        {
            return base.File(GetImage("wire"), "image/png");
        }

        /// <summary>
        /// Serves transparent image
        /// </summary>
        /// <returns>ActionResult of a transparent image file</returns>
        //GET: Images/Transparent
        [HttpGet]
        public ActionResult Transparent()
        {
            return base.File(GetImage("transparent"), "image/png");
        }

        /// <summary>
        /// Serves missing texture image
        /// </summary>
        /// <returns>ActionResult of a missing texture placeholder</returns>
        //GET: Images/Missing
        [HttpGet]
        public ActionResult Missing()
        {
            return base.File(GetImage("missingTexture"), "image/png");
        }
    }
}
