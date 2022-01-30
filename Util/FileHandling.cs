using System.Collections.Generic;

namespace CircuitSharp.Util
{
    public static class FileHandling
    {
        public static List<string> ReadFile(string filePath)
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
    }
}