using System;

namespace CircuitSharp.Util.CSV
{
	public class CSVRecord
    {
        private CSVEnum Type;
        private string Data;

		public CSVRecord(CSVEnum type, string data)
        {
            this.Type = type;
            this.Data = data;
        }
	}
}