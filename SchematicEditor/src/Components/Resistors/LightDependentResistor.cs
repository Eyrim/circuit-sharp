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
    /// Light Dependent Resistor, inherits from DynamicResistor
    /// </summary>
    public class LightDependentResistor : DynamicResistor
    {
        /// <summary>
        /// Constructs a new LDR object
        /// </summary>
        /// <param name="ResistanceRange">The minimum and maximum resistances of the component</param>
        /// <param name="IconURL">The URL of the Icon, rooted from wwwroot</param>
        public LightDependentResistor(Point Position, double Value,
            RotationEnum Rotation) : base(Position, Value, Rotation)
        {
            this.ResistanceRange = ResistanceRange;
            this.IconURL = IconURL;
        }
    }
}
