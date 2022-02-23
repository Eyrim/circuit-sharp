using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CircuitSharp.Models;
using System.IO;

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

        // GET: Editor/GetImgUrlFromTypeID/
        public ActionResult GetImgUrlFromTypeID()
        {
            string file = Util.FileHandling.ReadFileToString(@"GenericData/ImgUrlFromTypeMap.json");

            return Json(file);
        }

        // GET: Editor/ComponentToIDMapJSON/
        public ActionResult ComponentToIDMapJSON()
        {
            string file = Util.FileHandling.ReadFileToString(@"G:\circuit-sharp\componentToIDMap.json");

            return Json(file);
        }
    }
}
