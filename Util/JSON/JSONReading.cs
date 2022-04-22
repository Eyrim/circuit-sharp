using System;
using System.IO;
using Newtonsoft.Json;
using CircuitSharp.Structures.Circuit;

namespace CircuitSharp.Util.JSON
{
    public class JSONReading
    {
        /*
         * https://www.newtonsoft.com/json/help/html/DeserializeWithJsonSerializerFromFile.htm
         */
        public static Circuit DeserializeFromFile(string Path)
        {
            Circuit circuit = null;

            // deserialize JSON directly from a file
            using (StreamReader file = File.OpenText(Path))
            {
                JsonSerializer serializer = new JsonSerializer();
                circuit = (Circuit)serializer.Deserialize(file, typeof(Circuit));
            }
            
            return circuit;
        }
    }
}
