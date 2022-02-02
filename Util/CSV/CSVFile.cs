using System.Collections.Generic;

namespace CircuitSharp.Util.CSV
{
    public class CSVFile<T>
    {
        List<KeyValuePair<CSVEnum, T>> Records;

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
        public CSVFile(List<KeyValuePair<CSVEnum, T>> GivenRecords)
        {
            //TODO: Validate
            this.Records = GivenRecords;
        }

        /// <summary>
        /// Returns the records
        /// </summary>
        /// <returns>The List<KeyValuePair<CSVEnum, T>> of records</returns>
        public List<KeyValuePair<CSVEnum, T>> GetRecords()
        {
            return this.Records;
        }
    }
}