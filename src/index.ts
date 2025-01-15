import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { config } from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import { logger } from './config/logger';
import { swaggerSpec } from './config/swagger';
import passport from './config/passport';
import connectDB from './config/database';
import { validateEnv } from './config/validateEnv';
import { AppError } from './utils/errors';
import { mainRouter } from './routes/index.routes';

// Load and validate environment variables
config();
const env = validateEnv();

const app = express();

// Security middleware
app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false,
}));
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
    query: req.query,
    body: req.body,
    headers: {
      ...req.headers,
      authorization: req.headers.authorization ? '[REDACTED]' : undefined
    }
  });
  next();
});

// API Documentation
app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(swaggerSpec, {
  explorer: true,
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: "REST API Documentation",
}));

// Handle service worker requests
app.get('/sw.js', (_req, res) => {
  res.set('Content-Type', 'application/javascript');
  res.send('');
});

// Initialize passport
app.use(passport.initialize());

// Mount main router
app.use('/api', mainRouter);

// 404 handler
app.use((_req, _res, next) => {
  next(new AppError(404, 'Route not found'));
});

// Global error handler
app.use((err: Error, req: express.Request, res: express.Response, _next: express.NextFunction) => {
  const errorDetails = {
    name: err.name,
    message: err.message,
    stack: err.stack,
    type: typeof err,
    keys: Object.keys(err),
    request: {
      path: req.path,
      method: req.method,
      query: req.query,
      body: req.body,
      headers: {
        ...req.headers,
        authorization: req.headers.authorization ? '[REDACTED]' : undefined
      },
      url: req.url,
      route: req.route,
      params: req.params
    }
  };

  // Log full error details
  logger.error({
    msg: 'Error occurred',
    err,
    context: errorDetails
  });

  // Handle specific error types
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    });
  }

  if (err instanceof SyntaxError) {
    return res.status(400).json({
      status: 'error',
      message: 'Invalid JSON',
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    });
  }

  if (err instanceof URIError) {
    return res.status(400).json({
      status: 'error',
      message: 'Invalid URI',
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    });
  }

  // Default error response
  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { 
      error: err.toString(),
      details: errorDetails
    }),
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