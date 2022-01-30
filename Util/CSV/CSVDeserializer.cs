using System.Collections.Generic;

namespace CircuitSharp.Util.CSV
{
    public static class CSVDeserializer
    {
        public static List<string> Deserialize(string filePath)
        {
            List<string> csv = FileHandling.ReadFile(filePath);
            List<string> csvUpdated = new List<string>();
            string line = "";

            for (int i = 0; i < csv.Count; i++)
            {
                line = csv[i];

                // Header line starts with #
                if (line[0] != '#')
                {
                    csvUpdated.Add(line);
                }
            }

            return csvUpdated;
        }
    }
}