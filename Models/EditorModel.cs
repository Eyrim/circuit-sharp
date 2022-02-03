using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CircuitSharp.Util.CSV;

namespace CircuitSharp.Models
{
    public class EditorModel
    {
        private CSVFile<string> csv;

        public CSVFile<string> GetCSVFile(string filePath)
        {
            CSVFile<string> csv = CSVDeserializer.Deserialize(filePath);

            return null;
        }
    }
}
