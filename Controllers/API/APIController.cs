using CircuitSharp.Models;
using CircuitSharp.Controllers.API.Helpers;
using CircuitSharp.SchematicEditor.src.Components;
using CircuitSharp.SchematicEditor.src.Components.Resistors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Server.IIS.Core;
using CircuitSharp.Util;
using System.Collections.Generic;
using System.IO;
using Microsoft.AspNetCore.Http;
using System;
using CircuitSharp.Util.JSON;

namespace CircuitSharp.Controllers
{
    public class APIController : Controller
    {
        private const string PersistenceFilePath = @"C:\Users\gamin\Desktop\circuit-sharp-fixed\circuit-sharp\Persistence\";

        // POST: API/PlaceComponent?userID=&typeID=&parentElementID=
        [HttpPost]
        public void PlaceComponent(string userID, string typeID, string parentElementID) //TODO: Add Grid functionality
        {
            Console.WriteLine($"userID: {userID}");
            Console.WriteLine($"typeID: {typeID}");
            Console.WriteLine($"parentElementID: {parentElementID}");

            Component component = APIHelpers.CreateComponent(typeID, parentElementID);

            string path = Path.Combine(PersistenceFilePath, userID);
            path += ".json";

            Console.WriteLine("AAAAAAAAA");
            Console.WriteLine($"Path: {path}");

            /*if (System.IO.File.Exists(path))
            {
                APIHelpers.CreateFile(path);
            }*/

            //DEBUG:
            EditorModel.Circuit = new Structures.Circuit.Circuit();
            EditorModel.PopulateCircuitCells();

            EditorModel.Circuit.Cells[Convert.ToInt32(parentElementID)].TypeID = typeID;
            JSONWriting.WriteCircuitToFile(path, EditorModel.Circuit);
        }
    }
}
