import pino from 'pino';

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
    level: (label: string): Record<string, string> => {
      return { level: label };
    },
  },
};

export const logger = pino(
  process.env.NODE_ENV === 'production' 
    ? productionConfig 
    : developmentConfig
); 