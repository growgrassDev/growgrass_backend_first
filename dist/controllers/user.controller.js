"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = exports.UserController = void 0;
const user_service_1 = require("../services/user.service");
class UserController {
    async getProfile(req, res, next) {
        try {
            const userId = req.user._id;
            const user = await user_service_1.userService.getUserProfile(userId);
            res.json(user);
        }
        catch (error) {
            next(error);
        }
    }
    async updateProfile(req, res, next) {
        try {
            const userId = req.user._id;
            const updateData = {
                name: req.body.name,
                avatar: req.body.avatar
            };
            const user = await user_service_1.userService.updateUserProfile(userId, updateData);
            res.json(user);
        }
        catch (error) {
            next(error);
        }
    }
    async getAllUsers(req, res, next) {
        try {
            const users = await user_service_1.userService.getAllUsers();
            res.json(users);
        }
        catch (error) {
            next(error);
        }
    }
    async updateUserRole(req, res, next) {
        try {
            const { userId } = req.params;
            const { role } = req.body;
            const user = await user_service_1.userService.updateUserRole(userId, role);
            res.json(user);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.UserController = UserController;
exports.userController = new UserController();
//# sourceMappingURL=user.controller.js.map