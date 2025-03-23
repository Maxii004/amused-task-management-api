import dotenv from 'dotenv';

dotenv.config();

export default {
  aws: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
  },
  dynamodb: {
    tableName: process.env.DYNAMODB_TABLE_NAME,
  },
  s3: {
    bucketName: process.env.S3_BUCKET_NAME,
  },
  cdn: {
    url: process.env.CDN_URL,
  },
  jsonplaceholder: {
    apiUrl: process.env.JSONPLACEHOLDER_API_URL,
  },
};