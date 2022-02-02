using System.Collections.Generic;

namespace CircuitSharp.Util.CSV
{
    public class CSVFile<T>
    {
        Dictionary<CSVEnum, T> Records;

        /// <summary>
        /// Default constructor for CSV, initialises Records to be null
        /// </summary>
        public CSVFile()
        {
        }

        /// <summary>
        /// Overload for CSV Constructor to allow Records to be non-null
        /// </summary>
        /// <param name="GivenRecords">The records to assign to this.Records</param>
        public CSVFile(Dictionary<CSVEnum, T> GivenRecords)
        {
            //TODO: Validate
            this.Records = GivenRecords;
        }

        /// <summary>
        /// Returns a record from this.Records
        /// </summary>
        /// <param name="CSVColumn">The CSVEnum column to return the value of</param>
        /// <returns>Value in Records dict corresponding to the key requested</returns>
        public T GetRecord(CSVEnum CSVColumn)
        {
            if (this.Records.TryGetValue(CSVColumn, out T value))
                return value;

            else
                throw new Exceptions.InvalidColumnRequestException();
        }
    }
}