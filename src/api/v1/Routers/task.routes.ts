import { Router } from "express";
import { authToken } from "../Middleware/auth.js";
import {
  create,
  edit,
  get,
  getAll,
  remove,
  removeAll,
} from "../Controller/task.controller.js";
const routes = Router();

routes.post("/create", authToken, create);
routes.put("/edit", authToken, edit);
routes.get("/get", authToken, get);
routes.get("/getAll", authToken, getAll);
routes.delete("/remove", authToken, remove);
routes.delete("/removeAll", authToken, removeAll);

export default routes;
