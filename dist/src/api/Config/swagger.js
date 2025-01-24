import * as data from "../../../package.json" assert { type: "json" };
import { __dirname } from "./config.js";
const version = data.default.version;
export const option = {
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
//# sourceMappingURL=swagger.js.map