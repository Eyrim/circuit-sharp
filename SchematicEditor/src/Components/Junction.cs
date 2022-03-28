using System.Collections.Generic;
using CircuitSharp.SchematicEditor.src.Components;
using CircuitSharp.Structures;
using CircuitSharp.SchematicEditor.src.Components.Enumerators;
using CircuitSharp.Util;

namespace CircuitSharp.SchematicEditor.src.Components
{
    public class Junction : Component
    {
        /// <summary>
        /// List of the components connected to the junction, passed by reference
        /// </summary>
        private List<Component> ComponentsAtJunction;


        /// <summary>
        /// Constructs a new junction object
        /// </summary>
        public Junction(Point Position, double Value,
            RotationEnum Rotation) : base(Position, Value, Rotation)
        {
            this.ComponentsAtJunction = new List<Component>();
        }


        /// <summary>
        /// Gets the number of compnents connected to the junction
        /// </summary>
        /// <returns>The number of components connected</returns>
        public int GetNumberOfComponentsAtJunction()
        {
            return this.ComponentsAtJunction.Count;
        }

        /// <summary>
        /// Adds a component by reference to the junction
        /// </summary>
        /// <param name="Comp">Reference to Component to add to junction</param>
        public void AddComponentToJunction(ref Component Comp)
        {
            this.ComponentsAtJunction.Add(Comp);
        }

        /// <summary>
        /// Clears the list of components connected to the junction
        /// </summary>
        public void ClearComponentsAtJunction()
        {
            this.ComponentsAtJunction.Clear();
        }

        /// <summary>
        /// Gets the list of components at the junction
        /// </summary>
        /// <returns>The List of components at the junction</returns>
        public List<Component> GetComponentsAtJunction()
        {
            return this.ComponentsAtJunction;
        }
    }
}
