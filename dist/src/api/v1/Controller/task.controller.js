import { Task } from "../Models/task.model.js";
import { APIError } from "../Interfaces/all.type.js";
import { valTaskCreate } from "../Validations/validation.js";
export const create = async (req, res) => {
    const result = valTaskCreate.safeParse(req.body);
    if (!result.success) {
        throw new APIError(`Validation false ${JSON.stringify(result.error.issues[0].message + " " + result.error.issues[0].path).replace(/\\"/g, '"')}`, 422);
    }
    const { title, description, dateDo, _id } = req.body;
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
    }
    catch (error) {
        if (error instanceof APIError) {
            console.error(error.message);
            res.status(error.statusCode).json(error.message);
        }
        else {
            res.status(500).json({ msg: "Internal Server error" });
        }
    }
};
//TODO
export const edit = async (req, res) => { };
export const get = async (req, res) => {
    try {
        const { _id } = req.body;
        const { Taskid } = req.query;
        console.log(Taskid);
        const TaskSearch = await Task.findOne({ _id: Taskid, user: _id });
        if (!TaskSearch) {
            throw new APIError("Task not found", 404);
        }
        res.status(200).json(TaskSearch);
    }
    catch (error) {
        if (error instanceof APIError) {
            console.error(error.message);
            res.status(error.statusCode).json(error.message);
        }
        else {
            res.status(500).json("Error unknow");
        }
    }
};
export const getAll = async (req, res) => {
    try {
        const { _id } = req.body;
        const TaskSearch = await Task.find({ user: _id });
        if (!TaskSearch) {
            throw new APIError("Tasks not found", 404);
        }
        res.status(200).json(TaskSearch);
    }
    catch (error) {
        if (error instanceof APIError) {
            console.error(error.message);
            res.status(error.statusCode).json(error.message);
        }
        else {
            res.status(500).json("Error unknow");
        }
    }
};
export const remove = async (req, res) => {
    try {
        const { _id } = req.body;
        const { Taskid } = req.query;
        console.log(Taskid);
        const TaskSearch = await Task.deleteOne({ _id: Taskid, user: _id });
        if (!TaskSearch) {
            throw new APIError("Task not found", 404);
        }
        res.status(200).json(TaskSearch);
    }
    catch (error) {
        if (error instanceof APIError) {
            console.error(error.message);
            res.status(error.statusCode).json(error.message);
        }
        else {
            res.status(500).json("Error unknow");
        }
    }
};
export const removeAll = async (req, res) => {
    try {
        const { _id } = req.body;
        const TaskSearch = await Task.deleteMany({ user: _id });
        if (!TaskSearch) {
            throw new APIError("Tasks not found", 404);
        }
        res.status(200).json(TaskSearch);
    }
    catch (error) {
        if (error instanceof APIError) {
            console.error(error.message);
            res.status(error.statusCode).json(error.message);
        }
        else {
            res.status(500).json("Error unknow");
        }
    }
};
//# sourceMappingURL=task.controller.js.map