import { authToken } from "../Middleware/auth.js";
import { Router } from "express";
import { create, login, edit, remove } from "../Controller/user.controller.js";
/**
 *@swagger
 * /api/user/create
 *    post:
 *        summary: Create user
 *        tags: [User]
 *        response:
 *          200:
 *            description: User info
 *            content:
 *              application/json
 */
const routes = Router();
routes.post("/create", create);
routes.post("/login", login);
routes.put("/edit", authToken, edit);
routes.delete("/delete", authToken, remove);
export default routes;
//# sourceMappingURL=user.routes.js.map