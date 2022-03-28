using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CircuitSharp.Util;
using CircuitSharp.SchematicEditor.src.Components.Enumerators;

namespace CircuitSharp.SchematicEditor.src.Components.Wires
{
    /// <summary>
    /// Wire component
    /// </summary>
    public class Wire : Component
    {
        public Wire(Point Position, double Value, 
            RotationEnum Rotation) : base(Position, Value, Rotation)
        {

        }
    }
}
