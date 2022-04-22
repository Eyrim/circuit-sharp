using System;
using System.Collections.Generic;
using CircuitSharp.SchematicEditor.src.Components;
using CircuitSharp.Structures.Circuit;


namespace CircuitSharp.Models
{
    public class EditorModel
    {
        public static int RowCount = 5;
        public static int ColumnCount = 5;
        public static Circuit Circuit { get; set; }

        //TODO: Implement way of knowing screen size, JS update controller, updates model

        /// <summary>
        /// Populates the cells with placeholder values, each parentID will be the correct value.
        /// Everything else is null
        /// </summary>
        public static void PopulateCircuitCells()
        {
            List<Cell> cells = new List<Cell>();

            for (int i = 0; i < RowCount * ColumnCount; i++)
            {
                cells.Add(new Cell(i.ToString(), null, null));
                /*Circuit.Cells.SetValue(new Cell(i.ToString(), "undefined", -1), i);*/
            }

            Circuit.Cells = cells.ToArray();
        }

        public static void ModifyCell(int ParentID, Cell NewCell)
        {
            Circuit.Cells[ParentID] = NewCell;
        }
    }
}
