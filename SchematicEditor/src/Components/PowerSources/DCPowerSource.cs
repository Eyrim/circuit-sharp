using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CircuitSharp.SchematicEditor.src.Components.Enumerators;
using CircuitSharp.SchematicEditor.src.Components.Wires;
using CircuitSharp.Util;
namespace CircuitSharp.SchematicEditor.src.Components.PowerSources
{
    public class DCPowerSource : Component
    {
        public double Voltage { get; set; }


        public DCPowerSource(Point Position, double Value,
            RotationEnum Rotation) : base(Position, Value, Rotation)
        {

        }
    }
}
