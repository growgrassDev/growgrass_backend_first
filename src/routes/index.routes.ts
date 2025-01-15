import { Router } from 'express';
import { authRoutes } from './auth.routes';
import { userRoutes } from './user.routes';

const router = Router();

// Welcome route
router.get('/', (_req, res) => {
  res.json({
    status: 'success',
    message: 'Welcome to the API',
    version: '1.0.0',
    docs: '/api-docs'
  });
});

// Health check
router.get('/health', (_req, res) => {
  res.json({
    status: 'success',
    message: 'OK',
    timestamp: new Date().toISOString()
  });
});

// Mount other routes
router.use('/auth', authRoutes);
router.use('/users', userRoutes);

export { router as mainRouter }; 