using e_parkingChallan.Entities;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;

namespace e_parkingChallan.Services
{
    public class VehicleService
    {
        public readonly IMongoCollection<Vehicle> vehicleCollection;

        public VehicleService(IOptions<EParkingDatabaseSettings> options)
        {
            var mongoClient = new MongoClient(options.Value.MongoDbConnection);
            var mongoDatabase = mongoClient.GetDatabase(options.Value.DatabaseName);
            vehicleCollection = mongoDatabase.GetCollection<Vehicle>("Vehicle");
        }

        public async Task<List<Vehicle>> GetVehiclesAsync(string Id)
        {
            return await vehicleCollection.Find(x => x.OwnerId == Id).ToListAsync();
        }

        public async Task AddVehicleAsync(Vehicle vehicle)
        {
            await vehicleCollection.InsertOneAsync(vehicle);
        }
        public async Task<Vehicle> GetVehicleByRegAsync(string reg)
        {
            return await vehicleCollection.Find(x => x.Registration == reg).FirstOrDefaultAsync();
        }
    }
}