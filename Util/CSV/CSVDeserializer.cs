using System;
using System.Collections.Generic;

namespace CircuitSharp.Util.CSV
{
    public static class CSVDeserializer
    {
        public static CSVFile<string> Deserialize(string filePath)
        {
            List<string> csv = FileHandling.ReadFile(filePath);
            List<string> csvUpdated = new List<string>();
            List<string> orderOfValues = new List<string>();
            List<string> splitLine = null;
            string line = "";
            string item = "";

            // For every line in the CSV file
            for (int i = 0; i < csv.Count; i++)
            {
                // The current line
                line = csv[i];
                // The current line split on every comma
                splitLine = new List<string>(line.Split(","));

                // For the number of elements in the current line
                for (int j = 0; j < splitLine.Count; j++)
                {
                    item = splitLine[j];

                    // If the current element is a comment, ignore it
                    if (item[0] == '#')
                    {
                        continue;
                    }

                    // If the current element is a header 
                    else if (item[0] == '@')
                    {
                        orderOfValues.Add(line.Replace('@', ' '));
                        continue;
                    }

                    // If the current element isn't a comma, add it to the new list
                    else
                    {
                        csvUpdated.Add(item);
                    }
                }
            }

            return new CSVFile<string>();
        }
    }
}