using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace e_parkingChallan.Entities
{
    public class AnnualTax
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public ObjectId Id { get; set; }
        [BsonElement]
        public double  Amount { get; set; }
        [BsonElement]
        public string  UserId { get; set; }
    }
}