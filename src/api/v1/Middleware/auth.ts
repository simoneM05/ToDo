import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../Config/config.js";
import { IUser } from "../Interfaces/all.type.js";

export const authToken: RequestHandler = (req, res, next) => {
  let token = null;
  if (req.header("Authorization")) {
    token = req.header("Authorization")!.split(" ")[1];
  }
  if (token) {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        res.status(401).send({ msg: "Invalid Token" });
      } else {
        const userId = decoded as IUser;
        req.body._id = userId._id;
        next();
      }
    });
  } else {
    res.status(401).send({ msg: "Token is not supplied" });
  }
};
