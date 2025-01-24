import { Task } from "../Models/task.model.js";
import { APIError, CustomRequest, ITask } from "../Interfaces/interface.js";
import { valTaskCreate, valTaskEdit } from "../Validations/validation.js";

export const create: CustomRequest = async (req, res) => {
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

export const edit: CustomRequest = async (req, res) => {
  const result = valTaskEdit.safeParse(req.body);
  if (!result.success) {
    throw new APIError(
      `Validation false ${JSON.stringify(
        result.error.issues[0].message + " " + result.error.issues[0].path
      ).replace(/\\"/g, '"')}`,
      422
    );
  }
  const { title, description, check, pepole, dateDo, _id }: ITask = req.body;
  const { Taskid } = req.query;
  const TaskSearch = await Task.findOne({ user: _id, _id: Taskid });
  if (!TaskSearch) {
    throw new APIError("Task not found", 404);
  }
  if (TaskSearch) {
    title ? (TaskSearch.title = title) : null;
    description ? (TaskSearch.description = description) : null;
    check ? (TaskSearch.check = check) : null;
    pepole ? (TaskSearch.pepole = pepole) : null;
    dateDo ? (TaskSearch.dateDo = dateDo) : null;
  }
  TaskSearch.save();
  res.status(200).json({ msg: "Task edit succesfull", task: TaskSearch });
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

export const get: CustomRequest = async (req, res) => {
  try {
    const { _id }: ITask = req.body;
    const { Taskid } = req.query;
    console.log(Taskid);

    const TaskSearch = await Task.findOne({ _id: Taskid, user: _id });
    if (!TaskSearch) {
      throw new APIError("Task not found", 404);
    }
    res.status(200).json(TaskSearch);
  } catch (error: unknown) {
    if (error instanceof APIError) {
      console.error(error.message);
      res.status(error.statusCode).json(error.message);
    } else {
      res.status(500).json("Error unknow");
    }
  }
};
export const getAll: CustomRequest = async (req, res) => {
  try {
    const { _id }: ITask = req.body;

    const TaskSearch = await Task.find({ user: _id });
    if (!TaskSearch) {
      throw new APIError("Tasks not found", 404);
    }
    res.status(200).json(TaskSearch);
  } catch (error: unknown) {
    if (error instanceof APIError) {
      console.error(error.message);
      res.status(error.statusCode).json(error.message);
    } else {
      res.status(500).json("Error unknow");
    }
  }
};
export const remove: CustomRequest = async (req, res) => {
  try {
    const { _id }: ITask = req.body;
    const { Taskid } = req.query;
    console.log(Taskid);

    const TaskSearch = await Task.deleteOne({ _id: Taskid, user: _id });
    if (!TaskSearch) {
      throw new APIError("Task not found", 404);
    }
    res.status(200).json(TaskSearch);
  } catch (error: unknown) {
    if (error instanceof APIError) {
      console.error(error.message);
      res.status(error.statusCode).json(error.message);
    } else {
      res.status(500).json("Error unknow");
    }
  }
};
export const removeAll: CustomRequest = async (req, res) => {
  try {
    const { _id }: ITask = req.body;

    const TaskSearch = await Task.deleteMany({ user: _id });
    if (!TaskSearch) {
      throw new APIError("Tasks not found", 404);
    }
    res.status(200).json(TaskSearch);
  } catch (error: unknown) {
    if (error instanceof APIError) {
      console.error(error.message);
      res.status(error.statusCode).json(error.message);
    } else {
      res.status(500).json("Error unknow");
    }
  }
};
