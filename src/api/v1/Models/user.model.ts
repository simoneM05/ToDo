import { Schema, model } from "mongoose";
import { IUser } from "../Interfaces/all.type.js";

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  username: { type: String, required: true, unique: true },
});

const User = model<IUser>("User", UserSchema);

export { User };
