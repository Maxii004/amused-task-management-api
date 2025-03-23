import axiosInstance from '@utils/axios';
import { getCachedData, setCachedData } from '@services/cache.service';
import logger from '@utils/logger';

const CACHE_KEY = 'external-api-users';

export const fetchUsers = async () => {
  try {
    // Check if data is cached
    const cachedData = await getCachedData(CACHE_KEY);
    if (cachedData) {
      logger.info('Returning cached users');
      return cachedData;
    }

    // Fetch data from external API
    logger.info('Fetching users from external API');
    const response = await axiosInstance.get('/users');
    const users = response.data; // This is an array of user objects

    // Cache the data
    await setCachedData(CACHE_KEY, users);

    logger.info('Successfully fetched and cached users', { count: users.length });
    return users;
  } catch (error) {
    logger.error('Failed to fetch users from external API', { error });
    throw error;
  }
};