using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ElectronNET.API;
using ElectronNET.API.Entities;

namespace CircuitSharp.Controllers
{
    public class MenuController : Controller
    {
        public IActionResult Index()
        {
            if (HybridSupport.IsElectronActive)
            {
                MenuItem[] menu = new MenuItem[]
                {
                    new MenuItem
                    {
                        Label = "File",
                        Submenu = new MenuItem[]
                        {
                            new MenuItem
                            {
                                Label = "Open",
                                Accelerator = "CmdOrCtrl+O"
                            },
                            new MenuItem
                            {
                                Label = "Save",
                                Accelerator = "CmdOrCtrl+S"
                            },
                            new MenuItem
                            {
                                Label = "Save As",
                                Accelerator = "CmdorCtrl+Shift+S"
                            }
                        }
                    },

                    new MenuItem
                    {
                        Label = "Edit",
                        Submenu = new MenuItem[]
                        {
                            new MenuItem
                            {
                                Label = "Preferences"
                            }
                        }
                    },

                    new MenuItem
                    {
                        Label = "View",
                        Submenu = new MenuItem[]
                        {
                            new MenuItem
                            {
                                Label = "TODO"
                            },

                            new MenuItem
                            {
                                Label = "Reload",
                                Click = () =>
                                {
                                    Electron.WindowManager.BrowserWindows.ToList().ForEach(BrowserWindow =>
                                    {
                                        if (BrowserWindow.Id != 1)
                                            BrowserWindow.Close();

                                        else
                                            BrowserWindow.Reload();
                                    });
                                }
                            },

                            new MenuItem
                            {
                                Label = "Toggle Full Screen",
                                Accelerator = "CmdOrCtrl+F",
                                Click = async () =>
                                {
                                    bool isFullScreen = await Electron.WindowManager.BrowserWindows.First().IsFullScreenAsync();
                                    Electron.WindowManager.BrowserWindows.First().SetFullScreen(!isFullScreen);
                                }
                            },

                            new MenuItem
                            {
                                Type = MenuType.separator
                            },

                            new MenuItem
                            {
                                Label = "Open Developer Tools",
                                Accelerator = "CmdOrCtrl+Shift+I",
                                Click = () =>
                                {
                                    Electron.WindowManager.BrowserWindows.First().WebContents.OpenDevTools();
                                }
                            }
                        }
                    },

                    new MenuItem
                    {
                        Label = "Navigate",
                        Submenu = new MenuItem[]
                        {
                            new MenuItem
                            {
                                Label = "Home",
                                Submenu = new MenuItem[]
                                {
                                    new MenuItem
                                    {
                                        Label = "Home",
                                        Click = () =>
                                        {
                                            Electron.WindowManager.BrowserWindows.First().LoadURL($"http://localhost:{BridgeSettings.WebPort}/");
                                        }
                                    },

                                    new MenuItem
                                    {
                                        Label = "Privacy",
                                        Click = () =>
                                        {
                                            Electron.WindowManager.BrowserWindows.First().LoadURL($"http://localhost:{BridgeSettings.WebPort}/Privacy");
                                        }
                                    }
                                }
                            },

                            new MenuItem
                            {
                                Type = MenuType.separator
                            },

                            new MenuItem
                            {
                                Label = "Editor",
                                Submenu = new MenuItem[]
                                {
                                    new MenuItem
                                    {
                                        Label = "Editor",
                                        Click = () =>
                                        {
                                            Electron.WindowManager.BrowserWindows.First().LoadURL($"http://localhost:{BridgeSettings.WebPort}/Editor/");
                                        }
                                    },

                                    new MenuItem
                                    {
                                        Label = "Ohm's Law",
                                        Click = () => 
                                        {
                                            Electron.WindowManager.BrowserWindows.First().LoadURL($"http://localhost:{BridgeSettings.WebPort}/Editor/OhmsLaw");
                                        }
                                    },

                                    new MenuItem
                                    {
                                        Label = "Impedance of LPF",
                                        Click = () => 
                                        {
                                            Electron.WindowManager.BrowserWindows.First().LoadURL($"http://localhost:{BridgeSettings.WebPort}/Editor/ImpedenceLPF");
                                        }
                                    }
                                }
                            }
                        }
                    }
                };

                Electron.Menu.SetApplicationMenu(menu);
            }

            return Ok();
        }
    }
}
