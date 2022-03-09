using System;
using System.Collections.Generic;
using CircuitSharp.SchematicEditor.src.Components.Exceptions;

namespace CircuitSharp.SchematicEditor.src.Components.Resistors
{
    public class Potentiometer : Resistor
    {
        /// <summary>
        /// The resistance range of the potentiometer
        /// </summary>
        private double[] ResistanceRange;

        /// <summary>
        /// Returns a new potentiometer object
        /// </summary>
        /// <param name="GivenCurrentResistance">The </param>
        /// <param name="GivenResistanceRange"></param>
        public Potentiometer(double GivenCurrentResistance, double[] GivenResistanceRange) : base(GivenCurrentResistance)
        {
            this.ResistanceRange = GivenResistanceRange;
            this.CurrentResistance = GivenCurrentResistance;
        }

        /// <summary>
        /// Sets the new resistance range
        /// </summary>
        /// <param name="GivenResistanceRange"></param>
        public void SetResistanceRange(double[] GivenResistanceRange)
        {
            bool valid = true;

            if (GivenResistanceRange.Length != 2) 
                throw new NotEnoughResistancesGivenException(Message: $"Double array of given resistances must be 2:\n{GivenResistanceRange.Length} specified");

            this.ResistanceRange = valid ? GivenResistanceRange : this.ResistanceRange;
        }

        /// <summary>
        /// Gets the resistance range
        /// </summary>
        /// <returns></returns>
        public double[] GetResistanceRange()
        {
            return this.ResistanceRange;
        }
    }
}
