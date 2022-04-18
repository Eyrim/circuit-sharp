using System.Collections.Generic;
using System.IO;
using System;
using CircuitSharp.Util;

namespace CircuitSharp.Models.Resources
{
    public class ImagesModel
    {
        private static Dictionary<string, string> TypeIDToControllerURL = new Dictionary<string, string>
        {
            {"0", "genericResistor" },
            {"1", "wire" },
            {"2", "wiredtl" },
            {"3", "cell" },
            {"4", "wireltd" },
            {"5", "wireutl" },
            {"6", "wireutr" },
            {"7", "capacitor" }
        };

        private static Dictionary<string, string> ImageIDToControllerURL = new Dictionary<string, string>
        {
            {"0", "missingTexture" }
        };


        public static string GetImage(Util.ImageTypeEnum ImageType, string ID)
        {
            if (ImageType == Util.ImageTypeEnum.Component)
            {
                return ServeComponent(ID);
            }
            else if (ImageType == Util.ImageTypeEnum.Background)
            {
                return ServeBackground(ID);
            }

            throw new Exception("ImageType was not a valid Image Type, See Util.ImageTypeEnum");
        }

        private static string ServeComponent(string ID)
        {
            if (TypeIDToControllerURL == null) { throw new NullReferenceException("TypeIDToControllerURL is null"); }

            string filePath = TypeIDToControllerURL[ID];
            string dir = @$"GenericData/Imgs/{filePath}";

            // Combines the directory and the filename to make a proper path
            return dir + ".png";
        }

        private static string ServeBackground(string ID)
        {
            if (ImageIDToControllerURL == null) { throw new NullReferenceException("ImageIDToControllerURL is null"); }

            string filePath = ImageIDToControllerURL[ID];
            string dir = $@"GenericData/Imgs/{filePath}";

            return dir + ".png";
        }
    }
}
