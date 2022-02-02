using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CircuitSharp.Controllers
{
    public class EditorController : Controller
    {
        // GET: EditorController
        public ActionResult Index()
        {
            return View();
        }
    }
}
