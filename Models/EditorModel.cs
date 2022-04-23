using System;
using System.IO;
using System.Collections.Generic;
using CircuitSharp.SchematicEditor.src.Components;
using CircuitSharp.Structures.Circuit;
using CircuitSharp.Controllers.API;
using CircuitSharp.Util.Files;

namespace CircuitSharp.Models
{
    public class EditorModel
    {
        public static string UserID { get; set; }
        
        public static int RowCount = 5;
        public static int ColumnCount = 5;
        public static Circuit Circuit { get; set; }

        //TODO: Implement way of knowing screen size, JS update controller, updates model

        public static void ModifyCell(int ParentID, Cell NewCell)
        {
            Circuit.Cells[ParentID] = NewCell;
        }

        public static void LoadCircuitByUserID(string ID)
        {
            string path = GetPathFromID(ID);

            Circuit = FileHandling.DeserializeFromFile(path);
        }

        private static string GetPathFromID(string ID)
        {
            string persistenceFilePath = Controllers.APIController.GetPersistenceFilePath();

            string path = Path.Combine(persistenceFilePath, ID);
            path += ".json";

            Console.WriteLine("EditorModel.GetPathFromID() = " + path);
            return path;
        }
    }
}
