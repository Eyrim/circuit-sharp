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
        public LightDependentResistor(double[] ResistanceRange, string IconURL)
        {
            this.ResistanceRange = ResistanceRange; 
            this.IconURL = IconURL; 
        }
    }
}
