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
            return View();
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
    }
}
