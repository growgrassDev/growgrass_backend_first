declare module 'swagger-jsdoc' {
  interface SwaggerDefinition {
    openapi: string;
    info: {
      title: string;
      version: string;
      description?: string;
    };
    servers?: Array<{
      url: string;
      description?: string;
    }>;
    components?: {
      securitySchemes?: Record<string, {
        type: 'apiKey' | 'http' | 'oauth2' | 'openIdConnect';
        description?: string;
        name?: string;
        in?: 'query' | 'header' | 'cookie';
        scheme?: string;
        bearerFormat?: string;
      }>;
    };
    security?: Array<Record<string, string[]>>;
  }

  interface Options {
    definition: SwaggerDefinition;
    apis: string[];
  }

  function swaggerJsdoc(options: Options): SwaggerDefinition;
  export = swaggerJsdoc;
} 