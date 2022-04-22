namespace CircuitSharp.Structures.Circuit
{
    public class Cell
    {
        public string ParentID { get; set; }
        public string TypeID { get; set; }
        public int? Value { get; set; }

        public Cell(string ParentID, string TypeID, int? Value)
        {
            this.ParentID = ParentID;
            this.TypeID = TypeID;
            this.Value = Value;
        }
    }
}
