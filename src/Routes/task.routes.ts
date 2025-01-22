import e from "express";
import { Task } from "../Models/task.model.js";
import { CustomRequest, ITask } from "../types/all.type.js";

const create: CustomRequest = async (req, res) => {};
const edit: CustomRequest = async (req, res) => {};
const get: CustomRequest = async (req, res) => {};
const getAll: CustomRequest = async (req, res) => {};
const remove: CustomRequest = async (req, res) => {};
const removeAll: CustomRequest = async (req, res) => {};

const routes = e.Router();

routes.post("/create");
routes.put("/edit");
routes.get("/get");
routes.get("/getAll");
routes.delete("/remove");
routes.delete("/removeAll");

export default routes;
