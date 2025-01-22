import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../Config/config.js";
import { IUser } from "../types/all.type.js";

export const generateToken = (user: IUser) => {
  return jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: "7d" });
};
