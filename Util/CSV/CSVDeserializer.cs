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


            return ListToCSV(csvUpdated);
        }

        public static CSV ListToCSV(List<string> data)
        {
            CSVRecord[] records = new CSVRecord[3]
            {
                new CSVRecord(CSVEnum.Name, data[0]),
                new CSVRecord(CSVEnum.Value, data[1]),
                new CSVRecord(CSVEnum.Code, data[2])
            };

            return new CSV(records);
        }

        public static CSV ArrayToCSV(string[] data)
        {
            CSVRecord[] records = new CSVRecord[3]
            {
                new CSVRecord(CSVEnum.Name, data[0]),
                new CSVRecord(CSVEnum.Value, data[1]),
                new CSVRecord(CSVEnum.Code, data[2])
            };

            return new CSV(records);
        }
    }
}