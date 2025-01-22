import { Router } from "express";
import { CustomRequest, IUser } from "../types/all.type.js";
import { User } from "../Models/user.model.js";
import bcrypt from "bcrypt";
import { generateToken } from "../Utils/utils.js";
import {
  valUserCreate,
  valUserEdit,
  valUserLogin,
  valUserRemove,
} from "../Validations/validation.js";
import { authToken } from "../Middleware/auth.js";

const routes = Router();

const create: CustomRequest = async (req, res) => {
  try {
    const result = valUserCreate.safeParse(req.body);
    if (!result.success) {
      res.status(400);
      throw new Error(
        `Validation false ${JSON.stringify(
          result.error.issues[0].message + " " + result.error.issues[0].path
        ).replace(/\\"/g, '"')}`
      );
    }
    const { email, password, username, name }: IUser = req.body;
    const [existEmail, existUsername] = await Promise.all([
      User.findOne({ email }),
      User.findOne({ username }),
    ]);
    if (existEmail) {
      res.status(400);
      throw new Error("Email arledy exist");
    }
    if (existUsername) {
      res.status(400);
      throw new Error("Username arledy exist");
    }
    const newUser = new User({
      name: name,
      email: email,
      password: await bcrypt.hash(password, 10),
      username: username,
    });
    await newUser.save();
    res.status(200).json({ msg: "User created" });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
      res.json({ error: error.message });
    } else {
      res.status(500).json({ msg: "Unknown error" });
    }
  }
};

///TODO
const edit: CustomRequest = async (req, res) => {
  try {
    const result = valUserEdit.safeParse(req.body);
    if (!result.success) {
      res.status(400);
      throw new Error(
        `Validation false ${JSON.stringify(
          result.error.issues[0].message + " " + result.error.issues[0].path
        ).replace(/\\"/g, '"')}`
      );
    }
    const { email, password, username, name, _id }: IUser = req.body;

    const UserSearch = await User.findById(_id);
    if (!UserSearch) {
      throw new Error("User not found");
    }
    if (UserSearch) {
      username ? (UserSearch.username = username) : null;
      name ? (UserSearch.name = name) : null;
      password ? (UserSearch.password = password) : null;
      email ? (UserSearch.email = email) : null;
    }
    await UserSearch.save();
    res.status(200).json({ msg: "User updated" });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
      res.json({ error: error.message });
    } else {
      res.status(500).json({ msg: "Unknown error" });
    }
  }
};

const login: CustomRequest = async (req, res) => {
  try {
    const result = valUserLogin.safeParse(req.body);
    if (!result.success) {
      res.status(400);
      throw new Error(
        `Validation false ${JSON.stringify(
          result.error.issues[0].message + " " + result.error.issues[0].path
        ).replace(/\\"/g, '"')}`
      );
    }
    const { email, password, username } = req.body;

    let userSearch;
    email ? (userSearch = await User.findOne({ email: email })) : null;
    username ? (userSearch = await User.findOne({ username: username })) : null;
    if (!userSearch) {
      res.status(404);
      throw new Error("User not found");
    }

    if (userSearch && !(await bcrypt.compare(password, userSearch.password))) {
      res.status(400);
      throw new Error("Password not conformed");
    } else {
      const token = generateToken(userSearch);
      res.status(200).json({ msg: "Login successfull", token: token });
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
      res.json({ error: error.message });
    } else {
      res.status(500).json({ msg: "Unknown error" });
    }
  }
};

//TODO
const remove: CustomRequest = async (req, res) => {
  try {
    const result = valUserRemove.safeParse(req.body);
    if (!result.success) {
      res.status(400);
      throw new Error(
        `Validation false ${JSON.stringify(
          result.error.issues[0].message + " " + result.error.issues[0].path
        ).replace(/\\"/g, '"')}`
      );
    }
    const { _id } = req.body;
    const removeUser = await User.findByIdAndDelete(_id);
    if (!removeUser) {
      res.status(404);
      throw new Error("User not found");
    }
    res.status(200).json({ msg: "User delete successfully" });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
      res.json({ error: error.message });
    } else {
      res.status(500).json({ msg: "Unknown error" });
    }
  }
};

routes.post("/create", create);
routes.post("/login", login);

routes.put("/edit", authToken, edit);
routes.delete("/delete", authToken, remove);

export default routes;
