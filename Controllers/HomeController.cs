using CircuitSharp.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.IO;
using System.Web;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace CircuitSharp.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            int testVar = 0;

            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        protected void btnRedirect_Click(object sender, EventArgs e)
        {
            Response.Redirect("Editor.cshtml");
        }

        //GET: MissingTexture
            //TODO: Move this to generic file or image controller
        public ActionResult MissingTexture()
        {
            string dir = @"GenericData/Imgs/missingTexture.png";

            return base.File(dir, "image/png");
        }
    }
}
