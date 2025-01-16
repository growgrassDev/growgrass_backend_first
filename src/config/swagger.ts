import swaggerJsdoc from 'swagger-jsdoc';
import { logger } from './logger';

type SwaggerSpec = ReturnType<typeof swaggerJsdoc>;

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'REST API Documentation',
      version: '1.0.0',
      description: 'API documentation for the REST API',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http' as const,
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        User: {
          type: 'object',
          required: ['email', 'name'],
          properties: {
            _id: { type: 'string' },
            email: { type: 'string', format: 'email' },
            name: { type: 'string' },
            role: { type: 'string', enum: ['user', 'admin'] },
            avatar: { type: 'string' },
            googleId: { type: 'string' },
          },
        },
        Error: {
          type: 'object',
          properties: {
            status: { type: 'string', example: 'error' },
            message: { type: 'string' },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.ts'],
  failOnErrors: true,
};

let swaggerSpec: SwaggerSpec;
try {
  swaggerSpec = swaggerJsdoc(options);
} catch (error) {
  logger.error('Failed to generate Swagger specification:', error);
  throw error;
}

export { swaggerSpec }; 