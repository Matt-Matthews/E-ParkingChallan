using e_parkingChallan.Entities;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace e_parkingChallan.Services
{
    public class UserService
    {
        private readonly IMongoCollection<User> _userCollection;

        public UserService(IOptions<EParkingDatabaseSettings> settings)
        {
            var mongoClient = new MongoClient(settings.Value.MongoDbConnection);
            var mongoDatabase = mongoClient.GetDatabase(settings.Value.DatabaseName);
            _userCollection = mongoDatabase.GetCollection<User>("User");

        }

        public async Task<User> GetUserAsync(string email)
        {
            return await _userCollection.Find(x => x.Email == email).FirstOrDefaultAsync();
        }
        public async Task CreateUserAsync(User user)
        {
            await _userCollection.InsertOneAsync(user);
        }
    }
}