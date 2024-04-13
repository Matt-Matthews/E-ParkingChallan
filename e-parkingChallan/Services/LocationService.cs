using e_parkingChallan.Entities;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace e_parkingChallan.Services
{
    public class LocationService
    {
        private readonly IMongoCollection<Location> _locationCollection;

        public LocationService(IOptions<EParkingDatabaseSettings> settings)
        {
            var mongoClient = new MongoClient(settings.Value.MongoDbConnection);
            var mongoDatabase = mongoClient.GetDatabase(settings.Value.DatabaseName);
            _locationCollection = mongoDatabase.GetCollection<Location>("Location");
        }

        public async Task<List<Location>> GetLocationsAsync(string input){
            return await _locationCollection.Find(x => x.City == input || x.Province == input || x.StreetLine == input).ToListAsync();
        }

        public async Task CreateLocationAsync(Location location){
            await _locationCollection.InsertOneAsync(location);
        }
    }
}