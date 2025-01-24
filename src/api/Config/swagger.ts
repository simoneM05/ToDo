import * as data from "../../../package.json" assert { type: "json" };
import swaggerJSDoc from "swagger-jsdoc";
import { __dirname } from "./config.js";

const version: string = data.default.version;

export const option: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "REST API docs",
      version,
    },
  },
  apis: [
    `${__dirname}/Routers/*.js`,
    `${__dirname}/Routers/*.ts`,
    `${__dirname}/Utils/swagger.js`,
    `${__dirname}/Utils/swagger.ts`,
  ],
};
