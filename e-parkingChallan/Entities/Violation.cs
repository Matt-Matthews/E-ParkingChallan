using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace e_parkingChallan.Entities
{
    public class Violation
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public ObjectId Id { get; set; }
        [BsonElement]
        public string RegNum { get; set; }
        [BsonElement]
        public string Description { get; set; }
        [BsonElement]
        public string LocationId { get; set; }
        [BsonElement]
        public string ViolationType { get; set; }
        [BsonElement]
        public string Status { get; set; }
        [BsonElement]
        public ObjectId OfficerId { get; set; }
        [BsonElement]
        public ObjectId OwnerId { get; set; }
        [BsonElement]
        public string[] ImageUrls { get; set; }
        [BsonElement]
        public DateTime CreatedAt { get; set; }

    }
}
