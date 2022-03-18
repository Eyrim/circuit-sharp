using System;
using System.Collections.Generic;
using CircuitSharp.SchematicEditor.src.Components;

namespace CircuitSharp.Structures.Circuit
{
    public class Circuit
    {
        private List<Component> Nodes;


        public Circuit()
        {
            this.Nodes = new List<Component>();
        }

        public Circuit(List<Component> Nodes)
        {
            this.Nodes = Nodes;
        }
      
        public void AddNode(ref Component Node)
        {
            if (Node == null)
                throw new Exception("Node reference was null: ");

            Nodes.Add(Node);
        }

        //TODO: Remove node

        public bool TryGetNode(string UUID, out Component Node)
        {
            Node = null;

            if (this.Nodes.Count == 0)
                return false;

            for (int i = 0; i < this.Nodes.Count; i++)
            {
                if (this.Nodes[i].UUID == UUID)
                {
                    Node = this.Nodes[i];
                    return true;
                }
            }

            return false;
        }

        public static void GetPath()
        {
            //
        }
    }
}
