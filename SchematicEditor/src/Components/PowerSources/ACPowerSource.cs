using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CircuitSharp.SchematicEditor.src.Components.Enumerators;
using CircuitSharp.SchematicEditor.src.Components.Wires;
using CircuitSharp.Util;

namespace CircuitSharp.SchematicEditor.src.Components.PowerSources
{
    public class ACPowerSource : Component
    {
        public double Frequency { get; set; }

        public double PositiveVoltage { get; set; }

        public double NegativeVoltage { get; set; }


        public ACPowerSource(int Position) : base(Position)
        {

        }
    }
}
