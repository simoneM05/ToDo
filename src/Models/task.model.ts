import { Schema, model } from "mongoose";
import { ITask } from "../types/all.type.js";

const TaskSchema = new Schema<ITask>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  dateDo: { type: Date, default: null },
  CreatedAt: { type: Date, default: Date.now },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  pepole: [{ type: Schema.Types.ObjectId, ref: "User" }],
  check: { type: Boolean, default: false },
});

const Task = model<ITask>("Task", TaskSchema);

export { Task };
