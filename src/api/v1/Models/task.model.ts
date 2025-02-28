import { Schema, model } from "mongoose";
import { ITask } from "../Interfaces/interface.js";

const TaskSchema = new Schema<ITask>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  dueDate: { type: Date, default: null },
  CreatedAt: { type: Date, default: Date.now },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  pepole: [{ type: Schema.Types.ObjectId, ref: "User" }],
  check: { type: Boolean, default: false },
});

const Task = model<ITask>("Task", TaskSchema);

export { Task };
