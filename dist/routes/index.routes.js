"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainRouter = void 0;
const express_1 = require("express");
const auth_routes_1 = require("./auth.routes");
const user_routes_1 = require("./user.routes");
const post_routes_1 = require("./post.routes");
const router = (0, express_1.Router)();
exports.mainRouter = router;
router.get('/', (_req, res) => {
    res.json({
        status: 'success',
        message: 'ยินดีต้อนรับสู่ API',
        version: '1.0.0',
        endpoints: {
            documentation: '/api-docs',
            auth: {
                register: '/api/auth/register',
                login: '/api/auth/login',
                googleLogin: '/api/auth/google',
                refreshToken: '/api/auth/refresh-token',
                logout: '/api/auth/logout'
            },
            users: {
                profile: '/api/users/me',
                updateProfile: '/api/users/me',
                allUsers: '/api/users'
            },
            posts: {
                create: '/api/posts',
                all: '/api/posts',
                single: '/api/posts/:postId',
                update: '/api/posts/:postId',
                delete: '/api/posts/:postId',
                myPosts: '/api/posts/user/me'
            }
        },
        healthCheck: '/api/health'
    });
});
router.get('/health', (_req, res) => {
    res.json({
        status: 'success',
        message: 'ระบบทำงานปกติ',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV
    });
});
router.use('/auth', auth_routes_1.authRoutes);
router.use('/users', user_routes_1.userRoutes);
router.use('/posts', post_routes_1.postRoutes);
//# sourceMappingURL=index.routes.js.map