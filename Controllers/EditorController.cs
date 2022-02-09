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
        // GET: EditorController
        public ActionResult Index()
        {
            var model = new EditorModel();

            return View(model);
        }

        // FETCH: EditorController/ComponentToIDMapJSON/
        public ActionResult ComponentToIDMapJSON()
        {
            string file = "";
            string line = "";

            using (StreamReader sr = new StreamReader(@"G:\circuit-sharp\componentToIDMap.json"))
            {
                while ((line = sr.ReadLine()) != null)
                {
                    file += line;
                }
            }

            return Json(file);
        }
    }
}
