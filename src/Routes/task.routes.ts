import e from "express";
import { Task } from "../Models/task.model.js";
import { APIError, CustomRequest, ITask } from "../types/all.type.js";
import { authToken } from "../Middleware/auth.js";
import { valTaskCreate } from "../Validations/validation.js";

const create: CustomRequest = async (req, res) => {
  const result = valTaskCreate.safeParse(req.body);
  if (!result.success) {
    throw new APIError(
      `Validation false ${JSON.stringify(
        result.error.issues[0].message + " " + result.error.issues[0].path
      ).replace(/\\"/g, '"')}`,
      422
    );
  }
  const { title, description, dateDo, _id }: ITask = req.body;

  const NewTask = new Task({
    title: title,
    description: description,
    dateDo: dateDo,
    user: _id,
  });
  if (!NewTask) {
    throw new APIError("Task not create", 400);
  }
  await NewTask.save();
  res.status(200).json({ msg: "Task created succesfull" });
  try {
  } catch (error: unknown) {
    if (error instanceof APIError) {
      console.error(error.message);
      res.status(error.statusCode).json(error.message);
    } else {
      res.status(500).json({ msg: "Internal Server error" });
    }
  }
};

const edit: CustomRequest = async (req, res) => {};
const get: CustomRequest = async (req, res) => {};
const getAll: CustomRequest = async (req, res) => {};
const remove: CustomRequest = async (req, res) => {};
const removeAll: CustomRequest = async (req, res) => {};

const routes = e.Router();

routes.post("/create", authToken, create);
routes.put("/edit");
routes.get("/get");
routes.get("/getAll");
routes.delete("/remove");
routes.delete("/removeAll");

export default routes;
