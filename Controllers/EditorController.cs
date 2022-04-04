using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using CircuitSharp.Models;
using System.IO;
using CircuitSharp.Util;
using CircuitSharp.SchematicEditor.src.Components.Resistors;
using CircuitSharp.SchematicEditor.src.Components.Wires;

namespace CircuitSharp.Controllers
{
    public class EditorController : Controller
    {
        // GET: Editor/
        public ActionResult Index()
        {
            var model = new EditorModel();

            return View(model);
        }

        // GET: Editor/GetImgUrlFromTypeID?TypeID=
        [HttpGet]
        public ActionResult GetImgUrlFromTypeID(string TypeID)
        { 
            string dir = @"GenericData/Imgs/";
            // Combines the directory and the filename to make a proper path
            string path = Path.Combine(dir, TypeID + ".png");

            return base.File(path, "image/png");
        }

        // POST: Editor/PlaceComponent?TypeID=
        [HttpPost]
        public void PlaceComponent(string TypeID, string GridPos, string Value, string Rotation) //TODO: Add Grid functionality
        {
            int gridX = int.Parse(GridPos.Split(",")[0]);
            int gridY = int.Parse(GridPos.Split(",")[1]);

            Point position = new Point(gridX, gridY);


            /*
             * When adding a new component to the application
             * It must be added here
             */
            switch (TypeID)
            {
                // Generic Resistor
                case "0":
                    //GenericResistor gr = new GenericResistor();
                    //EditorModel.AddComponent(gr);
                    break;

                case "1":
                    //Wire w = new Wire();
                    //EditorModel.AddComponent(w);
                    break;

                default:
                    break;
            }
        }

        /// <summary>
        /// TEMP, LITERALLY JUST WROTE THIS TO TEST A JS THING
        /// </summary>
        /// <returns></returns>
        public ActionResult GenericResistorImg()
        {
            string dir = @"GenericData/Imgs/GenericResistor";

            // Combines the directory and the filename to make a proper path
            string path = Path.Combine(dir + ".png");

            return base.File(path, "image/png");
        }

        public ActionResult TransparentImg()
        {
            string dir = @"GenericData/Imgs/Transparent";

            // Combines the directory and the filename to make a proper path
            string path = Path.Combine(dir + ".png");

            return base.File(path, "image/png");
        }
    }
}
