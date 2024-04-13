using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace e_parkingChallan.Entities
{
    public class EParkingDatabaseSettings
    {
        public string MongoDbConnection { get; set; } = null!;

        public string DatabaseName { get; set; } = null!;
    }
}