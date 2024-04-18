
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace e_parkingChallan.Entities
{
    public class Location
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public ObjectId Id { get; set; }
        [BsonElement]
        public string StreetLine { get; set; }
        [BsonElement]
        public string City { get; set; }
        [BsonElement]
        public string Province { get; set; }
    }
}