using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CircuitSharp.Models;
using System.IO;
using SchematicEditor.Components;
using Ksu.Cis300.Graphs;

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

        // POST: Editor/PlaceComponent?TypeID=&UUID=&Position=&Connections=
        [HttpPost]
        public ActionResult PlaceComponent(string TypeID, string UUID, string Position, string Connections)
        {
            DirectedGraph<>
        }
    }
}
