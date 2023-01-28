import {Application, Request, Response} from "express"
import swaggerJsdoc from "swagger-jsdoc";
import SwaggerUi from "swagger-ui-express";
import config from '../config/config';
import log from "./logger";

const version: string = config.VERSION;

const options: swaggerJsdoc.Options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "REST API Docs",
        version,
      },
      components: {
        securitySchemas: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
      },
      security: [
        {
          bearerAuth: [],
        },
      ],
    },
    apis: ["./src/routes/route.ts", "./src/schema/*.ts"],
  };

const swaggerSpec = swaggerJsdoc(options);

const swaggerDoc = (app: Application, port: Number) => {
    // Swagger page

    app.use('/docs', SwaggerUi.serve, SwaggerUi.setup(swaggerSpec));

    // Doc Format
    app.get("docs.json",(req: Request, res: Response) => {
        res.setHeader('Content-Type', 'application/json')
        res.send(swaggerSpec)
    });

    log.info(`Doc is available at http://localhost:${port}/docs`);
}

export default swaggerDoc;


