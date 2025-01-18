"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerSpec = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const logger_1 = require("./logger");
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
                    type: 'http',
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
let swaggerSpec;
try {
    exports.swaggerSpec = swaggerSpec = (0, swagger_jsdoc_1.default)(options);
}
catch (error) {
    logger_1.logger.error('Failed to generate Swagger specification:', error);
    throw error;
}
//# sourceMappingURL=swagger.js.map