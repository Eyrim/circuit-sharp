using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CircuitSharp.SchematicEditor.src.Components.Exceptions
{
    public class NotEnoughResistancesGivenException : Exception
    {
        public NotEnoughResistancesGivenException(string Message) : base(Message)
        {

        }

        public NotEnoughResistancesGivenException(Exception Inner, string Message = "") : base(Message, Inner)
        {

        }
    }
}
