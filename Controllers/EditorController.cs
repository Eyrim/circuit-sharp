using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CircuitSharp.Models;

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
    }
}
