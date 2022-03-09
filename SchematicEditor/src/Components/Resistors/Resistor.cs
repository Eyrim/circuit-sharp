using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CircuitSharp.SchematicEditor.src.Components.Resistors
{
    //TODO: Handle possible exceptions

    /// <summary>
    /// Abstract class all resistive loads implement
    /// </summary>
    public abstract class Resistor
    {
        /// <summary>
        /// The current resistance of the components
        /// </summary>
        protected double CurrentResistance;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="GivenCurrentResistance"></param>
        public Resistor(double GivenCurrentResistance)
        {
            this.CurrentResistance = GivenCurrentResistance;
        }

        /// <summary>
        /// Sets the current resistance
        /// </summary>
        /// <param name="GivenCurrentResistance">The new resistance</param>
        public void SetCurrentResistance(double GivenCurrentResistance)
        {
            this.CurrentResistance = GivenCurrentResistance;
        }
         
        /// <summary>
        /// Gets the current resistance
        /// </summary>
        /// <returns>The current resistance</returns>
        public double GetCurrentResistance()
        {
            return this.CurrentResistance;
        }
    }
}
