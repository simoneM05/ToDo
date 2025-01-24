import { Request, Response } from "express";
import { Document, Types } from "mongoose";

export interface User extends Document {
  name: string;
  status: "guest" | "user" | "admin";
  email: string;
  password: string;
  username: string;
}
export interface IUser extends User {
  friends: IUser[];
}
export interface IAdmin extends User {
  rule: "superUser" | "view" | "edit";
}
export interface ITask extends Document {
  title: string;
  description: string;
  dateDo: Date;
  CreatedAt?: Date;
  user: IUser["_id"];
  check?: boolean;
  pepole?: Types.ObjectId[];
}

export type CustomRequest = (
  req: Request,
  res: Response
) => void | Promise<void>;

export class APIError extends Error {
  public statusCode: number;
  public details?: any;

  constructor(message: string, statusCode: number, details?: any) {
    super(message);
    this.name = "APIError";
    this.statusCode = statusCode;
    this.details = details;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
