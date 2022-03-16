using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CircuitSharp.SchematicEditor.src.Components;
using CircuitSharp.Util.CSV;
using Ksu.Cis300.Graphs;

namespace CircuitSharp.Models
{
    public class EditorModel
    {
        private static DirectedGraph<Component, int> _ComponentGraph;

        public void AddNodeToTree(Component ToAdd)
        {
            _ComponentGraph.AddNode(ToAdd);
            _ComponentGraph.TryGetEdge(); //TODO: Work out way to identify each node properly, maybe use a pointer? i dont want to do that omg omg pls no :c   41
        }
    }
}
