using e_parkingChallan.Entities;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;

namespace e_parkingChallan.Services
{
    public class ViolationService
    {
        private readonly IMongoCollection<Violation> violationCollection;
        private readonly IMongoCollection<Payment> paymentCollection;
        private readonly IMongoCollection<ViolationType> violationTypeCollection;
        private readonly IMongoCollection<AnnualTax> annualTaxCollection;

        public ViolationService(IOptions<EParkingDatabaseSettings> options)
        {
            var mongoClient = new MongoClient(options.Value.MongoDbConnection);
            var mongoDB = mongoClient.GetDatabase(options.Value.DatabaseName);
            violationCollection = mongoDB.GetCollection<Violation>("violation");
            paymentCollection = mongoDB.GetCollection<Payment>("Payment");
            violationTypeCollection = mongoDB.GetCollection<ViolationType>("ViolationTyoe");
            annualTaxCollection = mongoDB.GetCollection<AnnualTax>("AnnualTax");
        }

        public async Task<List<Violation>> GetViolationsAsync(string input, int pageNumber = 1, int pageSize = 10)
        {
            return await violationCollection
                .Find(x => x.OfficerId == new ObjectId(input) || x.RegNum == input)
                .Skip((pageNumber - 1) * pageSize).Limit(pageSize)
                .ToListAsync();
        }

        public async Task<long> CountViolations(string input)
        {
            var officerFilter = Builders<Violation>.Filter.Eq(x => x.OfficerId, new ObjectId(input));
            var vehicleFilter = Builders<Violation>.Filter.Eq(x => x.RegNum, input);
            return await violationCollection.CountDocumentsAsync(Builders<Violation>.Filter.Or(officerFilter, vehicleFilter));
        }

        public async Task AddViolationAsync(Violation violation)
        {
            await violationCollection.InsertOneAsync(violation);
            var violationType = await GetViolationTypesAsync(violation.ViolationType);
            if(violationType.Count <= 0)
            {
                await violationTypeCollection.InsertOneAsync(new ViolationType {
                    Amount = 200,
                    Type = violation.ViolationType
                });
            }
        }

        public async Task AddPaymentAsync(Payment payment)
        {
            await paymentCollection.InsertOneAsync(payment);
            var update = Builders<Violation>.Update.Set(d => d.Status, "Paid");
            await violationCollection.FindOneAndUpdateAsync(x => x.Id == payment.ViolationId, update);
        }

        public async Task<List<ViolationType>> GetViolationTypesAsync(string input)
        {
            if(input == null)
            {
                return await violationTypeCollection.Find(_ => true).ToListAsync();
            }else
            {
                return await violationTypeCollection.Find(x => x.Type == input).ToListAsync();
            }
        }

        public async Task<List<AnnualTax>> GetAnnualTaxAsync(ObjectId id)
        {
            return await annualTaxCollection.Find(x => x.UserId == id).ToListAsync();
        }

        public async Task UpdateAnnualTask(ObjectId id, double amount)
        {
            var annualTax = await GetAnnualTaxAsync(id);
            var update = Builders<AnnualTax>.Update.Set(d => d.Amount, annualTax[0].Amount + amount);
            await annualTaxCollection.UpdateOneAsync(x=> x.UserId == id, update);
        }

        public async Task CreateAnnualTax(AnnualTax tax)
        {
            await annualTaxCollection.InsertOneAsync(tax);
        }
    }
}