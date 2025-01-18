"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = exports.AuthController = void 0;
const auth_service_1 = require("../services/auth.service");
const zod_1 = require("zod");
const registerSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
    name: zod_1.z.string().min(2),
});
const loginSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string(),
});
class AuthController {
    async register(req, res) {
        try {
            const { email, password, name } = registerSchema.parse(req.body);
            const user = await auth_service_1.authService.register(email, password, name);
            res.status(201).json({
                message: 'User registered successfully',
                user: {
                    id: user._id,
                    email: user.email,
                    name: user.name,
                    role: user.role,
                },
            });
        }
        catch (error) {
            if (error instanceof zod_1.z.ZodError) {
                res.status(400).json({ error: 'Invalid input data', details: error.errors });
                return;
            }
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
                return;
            }
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    async login(req, res) {
        try {
            const { email, password } = loginSchema.parse(req.body);
            const tokens = await auth_service_1.authService.login(email, password);
            res.status(200).json({
                message: 'Login successful',
                ...tokens,
            });
        }
        catch (error) {
            if (error instanceof zod_1.z.ZodError) {
                res.status(400).json({ error: 'Invalid input data', details: error.errors });
                return;
            }
            if (error instanceof Error) {
                res.status(401).json({ error: error.message });
                return;
            }
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    async refreshToken(req, res) {
        try {
            const refreshToken = req.body.refreshToken;
            if (!refreshToken) {
                res.status(400).json({ error: 'Refresh token is required' });
                return;
            }
            const tokens = await auth_service_1.authService.refreshToken(refreshToken);
            res.status(200).json(tokens);
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(401).json({ error: error.message });
                return;
            }
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    async logout(req, res) {
        try {
            const userId = req.user?._id;
            if (!userId) {
                res.status(401).json({ error: 'Unauthorized' });
                return;
            }
            await auth_service_1.authService.logout(userId);
            res.status(200).json({ message: 'Logged out successfully' });
        }
        catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}
exports.AuthController = AuthController;
exports.authController = new AuthController();
//# sourceMappingURL=auth.controller.js.map