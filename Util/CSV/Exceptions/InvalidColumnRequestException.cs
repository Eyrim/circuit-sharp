namespace CircuitSharp.Util.CSV.Exceptions
{
    [System.Serializable]
    public class InvalidColumnRequestException : System.Exception
    {
        public InvalidColumnRequestException()
        {
        }

        public InvalidColumnRequestException(string message = "Invalid Key, requested column not in record Dictionary") : base(message)
        {
        }

        public InvalidColumnRequestException(string message, System.Exception inner) : base(message, inner)
        {
        }
    }
}