using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace e_parkingChallan.Entities
{
    public class Payment
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public ObjectId Id { get; set; }
        [BsonElement]
        public string CardNo { get; set; }
        [BsonElement]
        public string CVV { get; set; }
        [BsonElement]
        public string ExpireDate { get; set; }
        [BsonElement]
        public string Amount { get; set; }
        [BsonElement]
        public string ViolationId { get; set; }
    }
}