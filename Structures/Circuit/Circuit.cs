using System;
using System.Collections.Generic;
using CircuitSharp.SchematicEditor.src.Components;

namespace CircuitSharp.Structures.Circuit
{
    public class Circuit
    {
        public Cell[] Cells { get; set; }


        /// <summary>
        /// Populates the cells with placeholder values, each parentID will be the correct value.
        /// Everything else is null
        /// </summary>
        public void PopulateCircuitCells()
        {
            List<Cell> cells = new List<Cell>();

            for (int i = 0; i < 25; i++)
            {
                cells.Add(new Cell(i.ToString(), null, null));
                /*Circuit.Cells.SetValue(new Cell(i.ToString(), "undefined", -1), i);*/
            }

            this.Cells = cells.ToArray();
        }
    }
}
