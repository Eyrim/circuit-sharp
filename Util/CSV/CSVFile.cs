using System.Collections.Generic;

namespace CircuitSharp.Util.CSV
{
    public class CSVFile<T>
    {
        List<KeyValuePair<CSVEnum, T>> Records;


        /// <summary>
        /// 
        /// </summary>
        /// <param name="index"></param>
        /// <param name="record"></param>
        /// <returns></returns>
        public bool TryGetRecordByIndex(int index, out KeyValuePair<CSVEnum, T> record)
        {
            record = new KeyValuePair<CSVEnum, T>();

            if (index >= this.Records.Count ||
                index < 0)
            {
                return false;
            }


            record = this.Records[index];
            return true;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public List<KeyValuePair<CSVEnum, T>> GetRecords()
        {
            return this.Records;
        }

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
    }
}