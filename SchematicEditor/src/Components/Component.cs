using System.Collections.Generic;
using CircuitSharp.SchematicEditor.src.Components.Enumerators;
using CircuitSharp.SchematicEditor.src.Components.Wires;

namespace CircuitSharp.SchematicEditor.src.Components
{
    /// <summary>
    /// Base class for all components. This class is abstract
    /// </summary>
    public abstract class Component
    {
        public string UUID { get; set; }

        public int GridX { get; set; }

        public int GridY { get; set; }

        public double Value { get; set; }

        public RotationEnum Rotation { get; set; }

        public Wire LeadWire { get; set; }
        
        public Wire TrailWire { get; set; }
    }
}
