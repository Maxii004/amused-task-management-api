import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import config from '@config/config';

const s3Client = new S3Client({
  region: config.aws.region,
  credentials: {
    accessKeyId: config.aws.accessKeyId || '',
    secretAccessKey: config.aws.secretAccessKey || '',
  },
});

export const generateUploadUrl = async (fileName: string) => {
  const command = new PutObjectCommand({
    Bucket: config.s3.bucketName,
    Key: fileName,
  });

  const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 }); // URL expires in 1 hour
  return url;
};

export const deleteFile = async (fileName: string) => {
  const command = new DeleteObjectCommand({
    Bucket: config.s3.bucketName,
    Key: fileName,
  });

  await s3Client.send(command);
};