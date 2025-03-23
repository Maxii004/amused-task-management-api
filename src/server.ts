import express from 'express';
import dynamoose from 'dynamoose';

import router from '@routes/router';
import {rateLimiter} from '@middlewares/rate-limiter';
import {errorHandler} from '@middlewares/error-handler';
import logger from '@utils/logger';

import config from '../config/config';

// Create new DynamoDB instance
const ddb = new dynamoose.aws.ddb.DynamoDB({
    credentials: {
        accessKeyId: config.aws.accessKeyId || '',
        secretAccessKey: config.aws.secretAccessKey || ''
    },
    region: config.aws.region || ''
});

// Set DynamoDB instance to the Dynamoose DDB instance
dynamoose.aws.ddb.set(ddb);

const app = express();
const PORT = process.env.PORT || 3000;

// Apply rate limiting to all requests
app.use(rateLimiter);

app.use(express.json());
app.use(router); // Use the centralized router
app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});

// Export the app for testing
export default app;