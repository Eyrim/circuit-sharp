using System.Collections.Generic;
using CircuitSharp.SchematicEditor.src.Components.Enumerators;
using CircuitSharp.SchematicEditor.src.Components.Wires;
using CircuitSharp.Util;

namespace CircuitSharp.SchematicEditor.src.Components
{
    /// <summary>
    /// Base class for all components. This class is abstract
    /// </summary>
    public abstract class Component
    {
        public string UUID { get; set; }

        public int Position { get; set; }

        public double Value { get; set; }

        /// <summary>
        /// The index of the next component in the Circuit list
        /// </summary>
        public List<int> IndexesOfNext { get; set; }

        public RotationEnum Rotation { get; set; }

        public Wire LeadWire { get; set; }
        
        public Wire TrailWire { get; set; }


        public Component(int position, double Value, RotationEnum Rotation)
        {
            this.Position = Position;
            this.Value = Value;
            this.Rotation = Rotation;

            IndexesOfNext = new List<int>();
        }
    }
}
