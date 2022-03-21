using System;
using System.Collections.Generic;
using CircuitSharp.SchematicEditor.src.Components;

namespace CircuitSharp.Structures.Circuit
{
    public class Circuit
    {
        /// <summary>
        /// Unordered list of the nodes in the circuit
        /// </summary>
        private List<Component> Nodes;


        public Circuit()
        {
            this.Nodes = new List<Component>();
        }
      

        public void AddNode(Component Node)
        {
            if (Node == null)
                throw new Exception("Node reference was null: ");

            Nodes.Add(Node);
        }

        public void RemoveNode(int index)
        {
            // Guard statement
            if (index < 0 || index > Nodes.Count - 1) { throw new IndexOutOfRangeException(); }

            Nodes.RemoveAt(index);
        }

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
    }
}
/*
 * Pass in list of connections as grid coordinates
 * 
 * When adding new Node
 *  - POST the coord
 *  - Work out connections based on existing list, can only be in one of 4 dirs
 */
