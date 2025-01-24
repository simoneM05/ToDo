import { Schema, model } from "mongoose";
const TaskSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    dateDo: { type: Date, default: null },
    CreatedAt: { type: Date, default: Date.now },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    pepole: [{ type: Schema.Types.ObjectId, ref: "User" }],
    check: { type: Boolean, default: false },
});
const Task = model("Task", TaskSchema);
export { Task };
//# sourceMappingURL=task.model.js.map