using CircuitSharp.Models;
using CircuitSharp.Util.Files;
using CircuitSharp.Structures.Circuit;
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
                    return new Wire(WireTypeEnum.Normal, Convert.ToInt32(position));

                // Wire Down To Left
                case "2":
                    //return new Wire(Convert.ToInt32(position));
                    return new Wire(WireTypeEnum.DTL, Convert.ToInt32(position));

                // Cell
                case "3":
                    return new DCPowerSource(Convert.ToInt32(position));

                // Wire Left To Down
                case "4":
                    //return new Wire(Convert.ToInt32(position));
                    return new Wire(WireTypeEnum.LTD, Convert.ToInt32(position));

                // Wire Up To Left
                case "5":
                    //return new Wire(Convert.ToInt32(position));
                    return new Wire(WireTypeEnum.UTL, Convert.ToInt32(position));

                // Wire Up To Right
                case "6":
                    //return new Wire(Convert.ToInt32(position));
                    return new Wire(WireTypeEnum.UTR, Convert.ToInt32(position));

                // Capacitor
                case "7":
                    return new Capacitor(Convert.ToInt32(position));

                default:
                    throw new ArgumentException($"No component type ID corresponds to the type ID specified: {typeID}");
            }
        }

        public static Circuit LoadCircuit(string userID)
        {
            string path = Path.Combine(APIController.GetPersistenceFilePath(), EditorModel.UserID);
            path += ".json";

            Circuit circuit = FileHandling.DeserializeFromFile(path);

            return circuit;
        }

        public static void ModifyCircuit(Circuit LoadedCircuit, List<Cell> ModifiedCells)
        {
            string modifiedParentID = "";

            for (int i = 0; i < ModifiedCells.Count; i++)
            {
                modifiedParentID = ModifiedCells[i].ParentID;
                LoadedCircuit.Cells[Convert.ToInt32(modifiedParentID)] = ModifiedCells[i];
            }

            EditorModel.Circuit = LoadedCircuit;
        }
    }
}
