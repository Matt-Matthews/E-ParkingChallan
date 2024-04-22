using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace e_parkingChallan.Entities
{
    public class Vehicle
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public ObjectId Id { get; set; }
        [BsonElement]
        public string Registration { get; set; }
        [BsonElement]
        public string Model { get; set; }
        [BsonElement]
        public string Make { get; set; }
        [BsonElement]
        public string VinNumber { get; set; }
        [BsonElement]
        public string Color { get; set; }
        [BsonElement]
        public string OwnerId { get; set; }
        [BsonElement]
        public DateTime CreatedAt { get; set; }
    }
}
