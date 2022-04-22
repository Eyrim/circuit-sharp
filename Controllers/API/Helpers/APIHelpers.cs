using CircuitSharp.Models;
using CircuitSharp.SchematicEditor.src.Components;
using CircuitSharp.SchematicEditor.src.Components.Resistors;
using CircuitSharp.SchematicEditor.src.Components.Wires;
using CircuitSharp.SchematicEditor.src.Components.PowerSources;
using CircuitSharp.SchematicEditor.src.Components.Capacitors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Server.IIS.Core;
using CircuitSharp.Util;
using System.Collections.Generic;
using System.IO;
using Microsoft.AspNetCore.Http;
using System;

namespace CircuitSharp.Controllers.API.Helpers
{
    public static class APIHelpers
    {
        public static Component CreateComponent(string typeID, string position)
        {
            switch (typeID)
            {
                // Generic Resistor
                case "0":
                    return new GenericResistor(Convert.ToInt32(position));

                // Wire
                case "1":
                    return new Wire(Convert.ToInt32(position));

                // Wire Down To Left
                case "2":
                    //return new Wire(Convert.ToInt32(position));
                    throw new NotImplementedException();

                // Cell
                case "3":
                    return new DCPowerSource(Convert.ToInt32(position));

                // Wire Left To Down
                case "4":
                    //return new Wire(Convert.ToInt32(position));
                    throw new NotImplementedException();

                // Wire Up To Left
                case "5":
                    //return new Wire(Convert.ToInt32(position));
                    throw new NotImplementedException();

                // Wire Up To Right
                case "6":
                    //return new Wire(Convert.ToInt32(position));
                    throw new NotImplementedException();

                // Capacitor
                case "7":
                    return new Capacitor(Convert.ToInt32(position));

                default:
                    throw new ArgumentException($"No component type ID corresponds to the type ID specified: {typeID}");
            }
        }
    }
}
