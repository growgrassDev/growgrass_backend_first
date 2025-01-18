"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEnv = void 0;
const zod_1 = require("zod");
const logger_1 = require("./logger");
const envSchema = zod_1.z.object({
    PORT: zod_1.z.string().transform(Number).default('3000'),
    NODE_ENV: zod_1.z.enum(['development', 'production', 'test']).default('development'),
    MONGODB_URI: zod_1.z.string().url(),
    JWT_SECRET: zod_1.z.string().min(32),
    JWT_REFRESH_SECRET: zod_1.z.string().min(32),
    JWT_EXPIRES_IN: zod_1.z.string(),
    JWT_REFRESH_EXPIRES_IN: zod_1.z.string(),
    GOOGLE_CLIENT_ID: zod_1.z.string(),
    GOOGLE_CLIENT_SECRET: zod_1.z.string(),
    GOOGLE_CALLBACK_URL: zod_1.z.string().url(),
    CORS_ORIGIN: zod_1.z.string(),
    RATE_LIMIT_WINDOW_MS: zod_1.z.string().transform(Number).default('900000'),
    RATE_LIMIT_MAX: zod_1.z.string().transform(Number).default('100'),
});
const validateEnv = () => {
    try {
        const env = envSchema.parse(process.env);
        logger_1.logger.info('Environment variables validated successfully');
        return env;
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            logger_1.logger.error('Environment validation failed:', {
                issues: error.issues.map(issue => ({
                    path: issue.path.join('.'),
                    message: issue.message
                }))
            });
        }
        else {
            logger_1.logger.error('Unexpected error during environment validation:', error);
        }
        throw error;
    }
};
exports.validateEnv = validateEnv;
//# sourceMappingURL=validateEnv.js.map