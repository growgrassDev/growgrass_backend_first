"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const auth_middleware_1 = require("../middleware/auth.middleware");
const admin_middleware_1 = require("../middleware/admin.middleware");
const user_controller_1 = require("../controllers/user.controller");
const router = (0, express_1.Router)();
exports.userRoutes = router;
router.get('/me', auth_middleware_1.authenticateJwt, user_controller_1.userController.getProfile);
router.put('/me', auth_middleware_1.authenticateJwt, user_controller_1.userController.updateProfile);
router.get('/', auth_middleware_1.authenticateJwt, admin_middleware_1.requireAdmin, user_controller_1.userController.getAllUsers);
router.patch('/:userId/role', auth_middleware_1.authenticateJwt, admin_middleware_1.requireAdmin, user_controller_1.userController.updateUserRole);
//# sourceMappingURL=user.routes.js.map