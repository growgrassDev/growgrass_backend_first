import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/errors';

export const requireAdmin = (req: Request, _res: Response, next: NextFunction) => {
  const user = req.user as { role?: string };
  
  if (!user || user.role !== 'admin') {
    return next(new AppError(403, 'Access denied. Admin only.'));
  }
  
  next();
}; 