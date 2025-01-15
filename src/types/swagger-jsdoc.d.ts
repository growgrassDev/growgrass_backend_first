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
      securitySchemes?: Record<string, any>;
    };
    security?: Array<Record<string, any>>;
  }

  interface Options {
    definition: SwaggerDefinition;
    apis: string[];
  }

  function swaggerJsdoc(options: Options): any;
  export = swaggerJsdoc;
} 