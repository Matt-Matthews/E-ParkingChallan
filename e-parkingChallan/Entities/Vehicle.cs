using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Entities;

namespace e_parkingChallan.Entities
{
    public class Vehicle : Entity
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
        public int VinNumber { get; set; }
        [BsonElement]
        public string Color { get; set; }
        [BsonElement]
        public ObjectId OwnerId { get; set; }
        [BsonElement]
        public DateTime CreatedAt { get; set; }
    }
}
