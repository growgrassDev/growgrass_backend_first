import { User } from '../models/User';
import { AppError } from '../utils/errors';

export class UserService {
  async getUserProfile(userId: string) {
    const user = await User.findById(userId).select('-password');
    if (!user) {
      throw new AppError(404, 'User not found');
    }
    return user;
  }

  async updateUserProfile(userId: string, updateData: { name?: string; avatar?: string }) {
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

  async getAllUsers() {
    return User.find().select('-password');
  }
}

export const userService = new UserService(); 