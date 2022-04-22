using CircuitSharp.Models;
using CircuitSharp.Structures.Circuit;
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

        public static string GetPersistenceFilePath()
        {
            return PersistenceFilePath;
        }

        // POST: API/PlaceComponent?userID=&typeID=&parentElementID=
        [HttpPost]
        public void PlaceComponent(string typeID, string parentElementID) //TODO: Add Grid functionality
        {
            Console.WriteLine($"typeID: {typeID}");
            Console.WriteLine($"parentElementID: {parentElementID}");

            //Component component = APIHelpers.CreateComponent(typeID, parentElementID);

            // Create new cell to be put into the circuit
            Cell newCell = new Cell(parentElementID, typeID, null);

            // If the circuit is null, define it
            if (EditorModel.Circuit == null)
            {
                EditorModel.Circuit = new Structures.Circuit.Circuit();
                EditorModel.PopulateCircuitCells();
            } 

            // Add new cell to the circuit
            EditorModel.Circuit.Cells[Convert.ToInt32(parentElementID)] = newCell;

            /*if (System.IO.File.Exists(path))
            {
                APIHelpers.CreateFile(path);
            }*/

            /*Cell newCell = new Cell(parentElementID, typeID, null);

            EditorModel.Circuit.Cells[Convert.ToInt32(parentElementID)] = newCell;
            JSONWriting.WriteCircuitToFile(path, EditorModel.Circuit);*/
        }

        [HttpPost]
        public ActionResult SetUserID(string userID)
        {
            EditorModel.UserID = userID;

            string path = Path.Combine(PersistenceFilePath, EditorModel.UserID);
            path += ".json";

            JSONWriting.WriteCircuitToFile(path, EditorModel.Circuit);

            return StatusCode(200);
        }
    }
}
