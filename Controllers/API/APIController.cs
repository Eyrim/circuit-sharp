﻿using CircuitSharp.Models;
using CircuitSharp.SchematicEditor.src.Components;
using CircuitSharp.SchematicEditor.src.Components.Resistors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Server.IIS.Core;
using CircuitSharp.Util;
using System.Collections.Generic;
using System.IO;
using Microsoft.AspNetCore.Http;
using System;

namespace CircuitSharp.Controllers
{
    public class APIController : Controller
    {
        // POST: API/PlaceComponent?typeID=&parentElementID=
        [HttpPost]
        public void PlaceComponent(string typeID, string parentElementID) //TODO: Add Grid functionality
        {
            
        }
    }
}
