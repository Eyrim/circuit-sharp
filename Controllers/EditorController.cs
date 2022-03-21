using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using CircuitSharp.Models;
using System.IO;
using CircuitSharp.Util;
using CircuitSharp.SchematicEditor.src.Components.Resistors;

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
        public void PlaceComponent(string TypeID, string GridPos, string Value) //TODO: Add Grid functionality
        {

        }
    }
}
