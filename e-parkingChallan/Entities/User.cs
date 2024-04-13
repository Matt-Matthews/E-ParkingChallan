
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;


namespace e_parkingChallan.Entities
{
    public class User
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public ObjectId Id { get; set; }
        [BsonElement]
        public string FirstName { get; set; }
        [BsonElement]
        public string LastName { get; set; }
        [BsonElement]
        public string Email { get; set; }
        [BsonElement]
        public string Contact { get; set; }
        [BsonElement]
        public string Password { get; set; }
        [BsonElement]
        public string Role { get; set; }
        [BsonElement]
        public DateTime CreatedAt { get; set; }
    }
}