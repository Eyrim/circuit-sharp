using System.Collections.Generic;
using System.IO;
using System;
using Newtonsoft.Json;
using CircuitSharp.Structures.Circuit;

namespace CircuitSharp.Util.Files
{
    public static class FileHandling
    {
        private static StreamReader Reader;
        private static StreamWriter Writer;

        ////////////////////////////////////////////////////////////////////////////////////////////////////////
        // Helper Methods
        ////////////////////////////////////////////////////////////////////////////////////////////////////////

        private static void ToggleStream(StreamInUseEnum Stream, string Path, bool Append = false, bool OpenText = false)
        {
            if (Stream == StreamInUseEnum.Reader && Stream == StreamInUseEnum.Writer)
                throw new ArgumentException("Cannot have active reader and writer");

            else if (Stream == StreamInUseEnum.Reader)
            {
                if (Writer != null)
                {
                    Writer.Dispose();
                }

                if (Reader != null)
                {
                    Reader.Dispose();
                }

                Reader = OpenText ? File.OpenText(Path) : new StreamReader(Path);

                return;
            }

            else if (Stream == StreamInUseEnum.Writer)
            {
                if (Reader != null)
                {
                    Reader.Dispose();
                }

                if (Writer != null)
                {
                    Writer.Dispose();
                }

                Writer = new StreamWriter(Path);

                //Writer = Append ? new StreamWriter(Path, true) : new StreamWriter(Path, false);

                return;
            }
        }

        private static void CreateIfNotExist(string filePath)
        {
            // Create file if it doesn't exist
            if (!(File.Exists(filePath)))
                File.Create(filePath);
        }


        ////////////////////////////////////////////////////////////////////////////////////////////////////////
        // Reading Methods
        ////////////////////////////////////////////////////////////////////////////////////////////////////////


        public static List<string> ReadFileToList(string filePath)
        {
            CreateIfNotExist(filePath);
            ToggleStream(StreamInUseEnum.Reader, filePath);

            List<string> file = new List<string>();
            string line = "";

            while ((line = Reader.ReadLine()) != null)
            {
                file.Add(line);
            }

            return file;
        }

        public static string ReadFileToString(string filePath)
        {
            CreateIfNotExist(filePath);
            ToggleStream(StreamInUseEnum.Reader, filePath);

            string file = "";
            string line = "";

            while ((line = Reader.ReadLine()) != null)
            {
                file += line;
            }

            return file;
        }

        public static Circuit DeserializeFromFile(string filePath)
        {
            CreateIfNotExist(filePath);
            //ToggleStream(StreamInUseEnum.Reader, filePath, OpenText: true);
            Circuit circuit;

            using (StreamReader sr = File.OpenText(filePath))
            { 
                JsonSerializer serializer = new JsonSerializer();
                circuit = (Circuit)serializer.Deserialize(sr, typeof(Circuit));

                sr.Dispose();
            }

            return circuit;
        }


        ////////////////////////////////////////////////////////////////////////////////////////////////////////
        // Writing Methods
        ////////////////////////////////////////////////////////////////////////////////////////////////////////


        public static void WriteToFile(string toWrite, string filePath)
        {
            CreateIfNotExist(filePath);
            //using (StreamWriter sw = new StreamWriter(filePath, append: false))

            ToggleStream(StreamInUseEnum.Writer, filePath, false);

            Writer.WriteLine(toWrite);
        }

        public static void AppendToFile(string toWrite, string filePath)
        {
            CreateIfNotExist(filePath);
            //using (StreamWriter sw = new StreamWriter(filePath, append: true))

            ToggleStream(StreamInUseEnum.Writer, filePath, true);

            Writer.WriteLine(toWrite);
        }

        public static void WriteJSONToFile(string JSON, string filePath)
        {
            CreateIfNotExist(filePath);

            using (StreamWriter sw = new StreamWriter(filePath))
            {

                JsonSerializer serializer = new JsonSerializer();
                serializer.Serialize(sw, JSON);
                sw.Dispose();
            }
        }

        public static void WriteCircuitToFile(Circuit circuitToWrite, string filePath)
        {
            CreateIfNotExist(filePath);

            //ToggleStream(StreamInUseEnum.Writer, filePath, false, OpenText: true);

            /*using (StreamWriter sw = new StreamWriter(filePath, false))
            {
                JsonSerializer serializer = new JsonSerializer();
                serializer.Serialize(sw, circuitToWrite);
                sw.Dispose();
            }*/

            // serialize JSON directly to a file
            using (StreamWriter file = File.CreateText(filePath))
            {
                JsonSerializer serializer = new JsonSerializer();
                serializer.Serialize(file, circuitToWrite);
                file.Dispose();
            }
        }
    }
}