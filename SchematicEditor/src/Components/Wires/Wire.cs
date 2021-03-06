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
        public WireTypeEnum Type { get; }

        public Wire(WireTypeEnum Type, int Position) : base(Position)
        {
            this.Type = Type;
        }
    }
}
