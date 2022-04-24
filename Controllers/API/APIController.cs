using CircuitSharp.Models;
using CircuitSharp.Util.Files;
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
using Newtonsoft.Json;

namespace CircuitSharp.Controllers
{
    public class APIController : Controller
    {
        private static List<Cell> ModifiedCells { get; set; }
        private const string PersistenceFilePath = @"C:\Users\gamin\Desktop\circuit-sharp-fixed\circuit-sharp\Persistence\";

        public static string GetPersistenceFilePath()
        {
            return PersistenceFilePath;
        }

        // POST: API/PlaceComponent?userID=&typeID=&parentElementID=
        [HttpPost]
        public void PlaceComponent(string typeID, string parentElementID) //TODO: Add Grid functionality
        {
            // If the circuit is null, define it
            if (EditorModel.Circuit == null)
            {
                EditorModel.Circuit = new Structures.Circuit.Circuit();
                EditorModel.Circuit.PopulateCircuitCells();
            }

            // If modified cells is null, define it
            if (ModifiedCells == null)
            {
                ModifiedCells = new List<Cell>();
            }

            // Create new cell to be put into the circuit
            Cell newCell = new Cell(parentElementID, typeID, null);

            ModifiedCells.Add(newCell);
            //EditorModel.ModifyCell(Convert.ToInt32(parentElementID), newCell);

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
            if (ModifiedCells == null)
            {
                ModifiedCells = new List<Cell>();
            }

            // Sets the user ID
            EditorModel.UserID = userID;
            // Gets the path of that user's circuit
            string path = Path.Combine(PersistenceFilePath, EditorModel.UserID);
            path += ".json";

            // If the user has never saved a circuit before
            if (!(System.IO.File.Exists(path)))
            {
                // Creates the file
                FileStream file = System.IO.File.Create(path);
                file.Dispose(); // Disposes of resources. Also unlocks handle

                // Creates a new template circuit to write to the file
                Circuit circuit = new Circuit();
                circuit.PopulateCircuitCells();

                // Writes the template to the file
                FileHandling.WriteCircuitToFile(circuit, path);
            }

            if (ModifiedCells.Count != 0)
            {
                Circuit loadedCircuit = APIHelpers.LoadCircuit(userID);

                APIHelpers.ModifyCircuit(loadedCircuit, ModifiedCells);

                FileHandling.WriteCircuitToFile(EditorModel.Circuit, path);
            }

            return StatusCode(200);
        }

        // GET: API/GetPersistenceFile
        [HttpGet]
        public ActionResult GetPersistenceFile(string ip)
        {
            // Gets the path of that user's circuit
            string path = Path.Combine(PersistenceFilePath, ip);
            path += ".json";

            // If it exists, load it into the Editor Model
            if (System.IO.File.Exists(path))
            {
                Circuit circuit = FileHandling.DeserializeFromFile(path);

                return base.Json(JsonConvert.SerializeObject(circuit));
            }

            return StatusCode(404);
        }

        [HttpPost]
        public ActionResult DeleteCircuit(string ip)
        {
            // Gets the path of that user's circuit
            string path = Path.Combine(PersistenceFilePath, ip);
            path += ".json";

            if (System.IO.File.Exists(path))
            {
                System.IO.File.Delete(path);

                return StatusCode(200);
            }

            return StatusCode(404);
        }
    }
}
