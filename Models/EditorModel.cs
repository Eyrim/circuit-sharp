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

        public static void AddComponent(Component ToAdd)
        {
            Circuit.AddNode(ToAdd);
        }
    }
}
