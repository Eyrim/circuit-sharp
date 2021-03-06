using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ElectronNET.API;
using CircuitSharp.Models;
using CircuitSharp.Models.Resources;

namespace CircuitSharp
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();

            // NOTE TO FUTURE SELF TO SAVE ME HOURS OF PAIN:
            //
            // METHODS UNDER HERE WON'T RUN BECAUSE THE ABOVE METHOD HASN'T RETURNED CONTROL TO HERE
            // :(
            // PUT METHODS ABOVE THE CREATEHOSTBUILDER
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseElectron(args);
                    webBuilder.UseEnvironment("Development");
                    webBuilder.UseStartup<Startup>();
                });
    }
}
