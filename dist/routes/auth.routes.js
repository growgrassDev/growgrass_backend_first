"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const passport_1 = __importDefault(require("passport"));
const router = (0, express_1.Router)();
exports.authRoutes = router;
router.post('/register', auth_controller_1.authController.register.bind(auth_controller_1.authController));
router.post('/login', auth_controller_1.authController.login.bind(auth_controller_1.authController));
router.post('/refresh-token', auth_controller_1.authController.refreshToken.bind(auth_controller_1.authController));
router.post('/logout', auth_middleware_1.authenticateJwt, auth_controller_1.authController.logout.bind(auth_controller_1.authController));
router.get('/google', passport_1.default.authenticate('google', {
    scope: ['profile', 'email'],
    session: false,
}));
router.get('/google/callback', passport_1.default.authenticate('google', {
    session: false,
    failureRedirect: '/login',
}), (req, res) => {
    const tokens = req.user;
    res.redirect(`${process.env.FRONTEND_URL}/auth/callback?` +
        `access_token=${tokens.accessToken}&` +
        `refresh_token=${tokens.refreshToken}`);
});
//# sourceMappingURL=auth.routes.js.map