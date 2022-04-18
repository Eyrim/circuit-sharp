using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.IO;
using System.Threading.Tasks;
using CircuitSharp.Models;
using CircuitSharp.Models.Resources;
using CircuitSharp.Util;

namespace CircuitSharp.Controllers
{
    public class ImagesController : Controller
    { 
        public ActionResult Index()
        {
            // HTTP 204 = no-content
                // Just to show the server is listening
            return StatusCode(204);
        }

        [HttpGet]
        //GET: Images/ComponentImage?TypeID=
        public ActionResult ComponentImage(string TypeID)
        {
            // The file path of the image to be served
            string imagePath = ImagesModel.GetImage(ImageTypeEnum.Component, TypeID);

            // Serves the correct image
            return base.File(imagePath, "image/png");
        }

        [HttpGet]
        //GET: Images/BackgroundImage?ID=
        public ActionResult BackgroundImage(string ID)
        {
            string imagePath = ImagesModel.GetImage(ImageTypeEnum.Background, ID);

            return base.File(imagePath, "image/png");
        }
    }
}
