using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CircuitSharp.SchematicEditor.src.Components.Enumerators;
using CircuitSharp.SchematicEditor.src.Components.Wires;
using CircuitSharp.Util;


namespace CircuitSharp.SchematicEditor.src.Components.Resistors
{
    /// <summary>
    /// Abstract class from which all non-static resistors inherit from
    /// </summary>
    public abstract class DynamicResistor : Component
    {
        /// <summary>
        /// The URL of the icon for the component, rooted from wwwroot
        /// </summary>
        public string IconURL { get; set; }

        /// <summary>
        /// The resistance range of the component
        /// </summary>
        public double[] ResistanceRange { get; set; }

        /// <summary>
        /// The current resistance of the component
        /// </summary>
        public double currentResistance { get; set; }


        public DynamicResistor(Point Position, double Value,
            RotationEnum Rotation) : base(Position, Value, Rotation)
        {

        }
    }
}
