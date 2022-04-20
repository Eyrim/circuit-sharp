using CircuitSharp.Models;
using CircuitSharp.SchematicEditor.src.Components;
using CircuitSharp.SchematicEditor.src.Components.Resistors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Server.IIS.Core;
using CircuitSharp.Util;
using System.Collections.Generic;
using System.IO;
using Microsoft.AspNetCore.Http;
using System;

namespace CircuitSharp.Controllers.API.Helpers
{
    public class APIHelpers
    {
        public void thing(int typeID)
        {
            Component component = null;

            switch (typeID)
            {
                // Generic Resistor
                case "0":
                    component = new GenericResistor();
                    break;
            }
        }
    }
}
