using System.Collections.Generic;
using System.IO;

namespace CircuitSharp.Util
{
    public static class FileHandling
    {
        public static List<string> ReadFileToList(string filePath)
        {
            List<string> file = new List<string>();
            string line = "";

            using (System.IO.StreamReader sr = new System.IO.StreamReader(filePath))
            {
                while ((line = sr.ReadLine()) != null)
                {
                    file.Add(line);
                }
            }

            return file;
        }

        public static string ReadFileToString(string filePath)
        {
            string file = "";
            string line = "";

            using (System.IO.StreamReader sr = new System.IO.StreamReader(filePath))
            {
                while ((line = sr.ReadLine()) != null)
                {
                    file += line;
                }
            }

            return file;
        }

        public static void WriteToFile(string toWrite, string filePath)
        {
            //TODO: Check if path exists
            using (StreamWriter sw = new StreamWriter(filePath, append: false))
            {
                sw.WriteLine(toWrite);
            }
        }

        public static void AppendToFile(string toWrite, string filePath)
        {
            //TODO: Check if path exists
            using (StreamWriter sw = new StreamWriter(filePath, append: true))
            {
                sw.WriteLine(toWrite);
            }
        }
    }
}