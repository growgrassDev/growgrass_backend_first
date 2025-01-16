import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { config } from 'dotenv';
import { logger } from './config/logger';
import passport from './config/passport';
import connectDB from './config/database';
import { validateEnv } from './config/validateEnv';
import { AppError } from './utils/errors';
import { mainRouter } from './routes/index.routes';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger';

// Load and validate environment variables
config();
const env = validateEnv();

const app = express();

// Security middleware
app.use(helmet());
app.use(cors({
  origin: env.CORS_ORIGIN,
  credentials: true,
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: env.RATE_LIMIT_WINDOW_MS,
  max: env.RATE_LIMIT_MAX,
});
app.use(limiter);

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging
app.use((req, _res, next) => {
  logger.info('Incoming request:', {
    path: req.path,
    method: req.method,
  });
  next();
});

// Initialize passport
app.use(passport.initialize());

// Root route
app.get('/', (_req, res) => {
  res.json({
    status: 'success',
    message: 'ยินดีต้อนรับสู่ API',
    version: '1.0.0',
    apiHealth: '/api/health',
    apiDocs: '/api-docs',
    apiEndpoint: '/api'
  });
});

// Handle service worker requests
app.get('/sw.js', (_req, res) => {
  res.set('Content-Type', 'application/javascript');
  res.send('');
});

// Swagger documentation only in development
if (process.env.NODE_ENV === 'development') {
  app.use('/api-docs', swaggerUi.serve);
  app.get('/api-docs', swaggerUi.setup(swaggerSpec, {
    explorer: true,
    customSiteTitle: "REST API Documentation",
  }));
}

// Mount main router
app.use('/api', mainRouter);

// 404 handler
app.use((_req, _res, next) => {
  next(new AppError(404, 'Route not found'));
});

// Global error handler
app.use((err: Error, req: express.Request, res: express.Response, _next: express.NextFunction) => {
  // Ignore errors from certain paths
  const ignorePaths = ['/sw.js', '/favicon.ico'];
  if (!ignorePaths.includes(req.path)) {
    // Log detailed error information
    logger.error({
      message: 'Error occurred',
      error: {
        name: err.name,
        message: err.message,
        stack: err.stack,
        path: req.path,
        method: req.method,
        body: req.body,
        query: req.query,
        params: req.params,
      }
    });
  }

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
  }

  // Handle other types of errors
  if (err instanceof SyntaxError) {
    return res.status(400).json({
      status: 'error',
      message: 'Invalid JSON format'
    });
  }

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { 
      error: err.message,
      stack: err.stack 
    })
  });
});

// Start server
const startServer = async (): Promise<void> => {
  try {
    await connectDB();
    app.listen(env.PORT, () => {
      logger.info(`Server is running in ${env.NODE_ENV} mode on port ${env.PORT}`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer(); 