import dynamoose from 'dynamoose';

const UserSchema = new dynamoose.Schema({
  id: Number,
  name: String,
  username: String,
  email: String,
  address: {
    type: Object,
    schema: {
      street: String,
      suite: String,
      city: String,
      zipcode: String,
      geo: {
        type: Object,
        schema: {
          lat: String,
          lng: String,
        },
      },
    },
  },
  phone: String,
  website: String,
  company: {
    type: Object,
    schema: {
      name: String,
      catchPhrase: String,
      bs: String,
    },
  },
});

const CacheSchema = new dynamoose.Schema({
  cacheKey: {
    type: String,
    hashKey: true, // Primary key
  },
  data: {
    type: Array, // Use Array type for storing arrays
    schema: [UserSchema], // Use UserSchema for array items
  },
  expiresAt: {
    type: Number, // Unix timestamp for TTL
    required: true,
  },
});

export const Cache = dynamoose.model('Cache', CacheSchema);