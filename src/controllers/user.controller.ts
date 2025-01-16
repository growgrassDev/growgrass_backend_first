import { Request, Response, NextFunction } from 'express';
import { userService } from '../services/user.service';

export class UserController {
  async getProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = (req.user as unknown as { _id: string })._id;
      const user = await userService.getUserProfile(userId);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }

  async updateProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = (req.user as unknown as { _id: string })._id;
      const updateData = {
        name: req.body.name,
        avatar: req.body.avatar
      };
      const user = await userService.updateUserProfile(userId, updateData);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }

  async getAllUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const users = await userService.getAllUsers();
      res.json(users);
    } catch (error) {
      next(error);
    }
  }

  async updateUserRole(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { userId } = req.params;
      const { role } = req.body;
      
      const user = await userService.updateUserRole(userId, role);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
}

export const userController = new UserController(); 