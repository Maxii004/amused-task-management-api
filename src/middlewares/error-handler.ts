import { Request, Response, NextFunction } from 'express';
import { HTTP_STATUS_CODES } from '@constants/common';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: err.message });
};