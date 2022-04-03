﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CircuitSharp.Util
{
    public class Point
    {
        public double X { get; set; }

        public double Y { get; set; }


        public Point(double X, double Y)
        {
            this.X = X;
            this.Y = Y;
        }
    }
}