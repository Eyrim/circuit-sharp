using System;
using System.IO;
using Newtonsoft.Json;
using CircuitSharp.Structures.Circuit;

namespace CircuitSharp.Util.JSON
{
    public static class JSONWriting
    {
        /// <summary>
        /// Writes JSON to a file
        /// 
        /// THIS METHOD OVERWRITES THE FILE
        /// </summary>
        /// <param name="Path">The path of the file to overwrite</param>
        /// <param name="JSON">The JSON to write to the file</param>
        public static void WriteJSONToFile(string Path, string JSON)
        {
            FileStream fs = new FileStream(Path, FileMode.Create, FileAccess.Write);

            using (StreamWriter sw = new StreamWriter(fs))
            {
                JsonSerializer serializer = new JsonSerializer();
                serializer.Serialize(sw, JSON);
            }
        }

        /// <summary>
        /// A copy of WriteJSONToFile but this writes a circuit instead of a preserialised string.
        /// 
        /// THIS METHOD OVERWRITES THE FILE
        /// </summary>
        /// <param name="Path">The file path to write to</param>
        /// <param name="CircuitToWrite">The circuit object to write to the file</param>
        /// <returns>True if success, False if exception</returns>
        public static bool WriteCircuitToFile(string Path, Circuit CircuitToWrite)
        {
            try
            {
                FileStream fs = new FileStream(Path, FileMode.Create);

                using (StreamWriter sw = new StreamWriter(fs))
                {
                    JsonSerializer serializer = new JsonSerializer();
                    serializer.Serialize(sw, CircuitToWrite);
                }

                return true;
            }
            catch (Exception e)
            {
                Console.Error.WriteLine(e.ToString());
                return false;
            }
        }
    }
}
