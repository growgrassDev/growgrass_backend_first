"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = exports.UserService = void 0;
const User_1 = require("../models/User");
const errors_1 = require("../utils/errors");
class UserService {
    async getUserProfile(userId) {
        const user = await User_1.User.findById(userId).select('-password');
        if (!user) {
            throw new errors_1.AppError(404, 'User not found');
        }
        return user;
    }
    async updateUserProfile(userId, updateData) {
        const user = await User_1.User.findByIdAndUpdate(userId, { $set: updateData }, { new: true, runValidators: true }).select('-password');
        if (!user) {
            throw new errors_1.AppError(404, 'User not found');
        }
        return user;
    }
    async getAllUsers() {
        return User_1.User.find().select('-password');
    }
    async updateUserRole(userId, role) {
        if (!['user', 'admin'].includes(role)) {
            throw new errors_1.AppError(400, 'Invalid role');
        }
        const user = await User_1.User.findByIdAndUpdate(userId, { $set: { role } }, { new: true, runValidators: true }).select('-password');
        if (!user) {
            throw new errors_1.AppError(404, 'User not found');
        }
        return user;
    }
}
exports.UserService = UserService;
exports.userService = new UserService();
//# sourceMappingURL=user.service.js.map