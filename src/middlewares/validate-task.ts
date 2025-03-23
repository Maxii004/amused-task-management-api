import { Request, Response, NextFunction } from 'express';
import { HTTP_STATUS_CODES } from '@constants/common';

export const validateCreateTask = (req: Request, res: Response, next: NextFunction) => {
  const { title, description } = req.body;
  if (!title || !description) {
    res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({ message: 'Title and description are required' });
    return; // Stop execution here
  }
  next(); // Proceed to the next middleware or route handler
};

export const validateUpdateTask = (req: Request, res: Response, next: NextFunction) => {
  const { title, description, status } = req.body;
  if (!title && !description && !status) {
    res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({ message: 'At least one field (title, description, status) is required' });
    return; // Stop execution here
  }
  if (status && !['pending', 'in-progress', 'completed'].includes(status)) {
    res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({ message: 'Invalid status' });
    return; // Stop execution here
  }
  next(); // Proceed to the next middleware or route handler
}