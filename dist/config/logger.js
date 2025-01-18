"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const pino_1 = __importDefault(require("pino"));
const developmentConfig = {
    transport: {
        target: 'pino-pretty',
        options: {
            colorize: true,
            translateTime: 'SYS:standard',
            ignore: 'pid,hostname',
            messageFormat: '{msg} {context}',
            errorProps: '*'
        },
    },
    level: 'debug'
};
const productionConfig = {
    level: 'info',
    formatters: {
        level: (label) => {
            return { level: label };
        },
    },
};
exports.logger = (0, pino_1.default)(process.env.NODE_ENV === 'production'
    ? productionConfig
    : developmentConfig);
//# sourceMappingURL=logger.js.map