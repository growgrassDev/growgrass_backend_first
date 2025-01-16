import { IUser, User } from '../models/User';
import { AppError } from '../utils/errors';

export class UserService {
  async getUserProfile(userId: string): Promise<IUser | null> {
    const user = await User.findById(userId).select('-password');
    if (!user) {
      throw new AppError(404, 'User not found');
    }
    return user;
  }

  async updateUserProfile(userId: string, updateData: { name?: string; avatar?: string }): Promise<IUser | null> {
    const user = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      throw new AppError(404, 'User not found');
    }

    return user;
  }

  async getAllUsers(): Promise<IUser[]> {
    return User.find().select('-password');
  }

  async updateUserRole(userId: string, role: 'user' | 'admin'): Promise<IUser | null> {
    if (!['user', 'admin'].includes(role)) {
      throw new AppError(400, 'Invalid role');
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { $set: { role } },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      throw new AppError(404, 'User not found');
    }

    return user;
  }
}

export const userService = new UserService(); 