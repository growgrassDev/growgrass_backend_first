import { Router } from 'express';
import { authRoutes } from './auth.routes';
import { userRoutes } from './user.routes';
import { postRoutes } from './post.routes';

const router = Router();

// Welcome route with API information
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

// Health check
router.get('/health', (_req, res) => {
  res.json({
    status: 'success',
    message: 'ระบบทำงานปกติ',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV
  });
});

// Mount routes
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/posts', postRoutes);

export { router as mainRouter }; 