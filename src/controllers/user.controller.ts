import { Request, Response } from 'express';
import { HTTP_STATUS_CODES } from '@constants/common';
import logger from '@utils/logger';
import { fetchUsers } from '@services/external-api.service';

export const getUsersHandler = async (req: Request, res: Response) => {
  try {
    logger.info('Fetching users');
    const users = await fetchUsers();
    res.status(HTTP_STATUS_CODES.OK).json(users);
  } catch (error) {
    logger.error('Failed to fetch users', { error });
    res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: 'Failed to fetch users' });
  }
};