import { Cache } from '@models/Cache';
import logger from '@utils/logger';

const CACHE_TTL = 5 * 60; // 5 minutes in seconds

export const getCachedData = async (cacheKey: string) => {
  try {
    logger.info('Fetching cached data', { cacheKey });
    const cachedItem = await Cache.get(cacheKey);
    if (cachedItem) {
      logger.info('Cache hit', { cacheKey });
      return cachedItem.data; // Return the cached data
    }
    logger.info('Cache miss', { cacheKey });
    return null; // Return null if no data is found
  } catch (error) {
    logger.error('Failed to fetch cached data', { cacheKey, error });
    throw error;
  }
};

export const setCachedData = async (cacheKey: string, data: any) => {
  try {
    logger.info('Caching data', { cacheKey });

    // Validate data
    if (!Array.isArray(data)) {
      throw new Error('Data must be an array');
    }

    const expiresAt = Math.floor(Date.now() / 1000) + CACHE_TTL; // Current time + TTL

    // Store the data in the cache
    await Cache.create({ cacheKey, data, expiresAt });

    logger.info('Data cached successfully', { cacheKey });
  } catch (error) {
    logger.error('Failed to cache data', { cacheKey, error });
    throw error;
  }
};

export const deleteCachedData = async (cacheKey: string) => {
  try {
    logger.info('Deleting cached data', { cacheKey });
    await Cache.delete(cacheKey);
    logger.info('Cached data deleted successfully', { cacheKey });
  } catch (error) {
    logger.error('Failed to delete cached data', { cacheKey, error });
    throw error;
  }
};