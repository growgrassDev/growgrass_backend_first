"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const dotenv_1 = require("dotenv");
const logger_1 = require("./config/logger");
const passport_1 = __importDefault(require("./config/passport"));
const database_1 = __importDefault(require("./config/database"));
const validateEnv_1 = require("./config/validateEnv");
const errors_1 = require("./utils/errors");
const index_routes_1 = require("./routes/index.routes");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = require("./config/swagger");
(0, dotenv_1.config)();
const env = (0, validateEnv_1.validateEnv)();
const app = (0, express_1.default)();
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({
    origin: env.CORS_ORIGIN,
    credentials: true,
}));
const limiter = (0, express_rate_limit_1.default)({
    windowMs: env.RATE_LIMIT_WINDOW_MS,
    max: env.RATE_LIMIT_MAX,
});
app.use(limiter);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((req, _res, next) => {
    logger_1.logger.info('Incoming request:', {
        path: req.path,
        method: req.method,
    });
    next();
});
app.use(passport_1.default.initialize());
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
app.get('/sw.js', (_req, res) => {
    res.set('Content-Type', 'application/javascript');
    res.send('');
});
if (process.env.NODE_ENV === 'development') {
    app.use('/api-docs', swagger_ui_express_1.default.serve);
    app.get('/api-docs', swagger_ui_express_1.default.setup(swagger_1.swaggerSpec, {
        explorer: true,
        customSiteTitle: "REST API Documentation",
    }));
}
app.use('/api', index_routes_1.mainRouter);
app.use((_req, _res, next) => {
    next(new errors_1.AppError(404, 'Route not found'));
});
app.use((err, req, res, _next) => {
    const ignorePaths = ['/sw.js', '/favicon.ico'];
    if (!ignorePaths.includes(req.path)) {
        logger_1.logger.error({
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
    if (err instanceof errors_1.AppError) {
        return res.status(err.statusCode).json({
            status: 'error',
            message: err.message,
            ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
        });
    }
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
const startServer = async () => {
    try {
        await (0, database_1.default)();
        app.listen(env.PORT, () => {
            logger_1.logger.info(`Server is running in ${env.NODE_ENV} mode on port ${env.PORT}`);
        });
    }
    catch (error) {
        logger_1.logger.error('Failed to start server:', error);
        process.exit(1);
    }
};
startServer();
//# sourceMappingURL=index.js.map