import jwt from "jsonwebtoken";
import { JWT_SECRET, __dirname } from "../../Config/config.js";
import path from "path";
import fs from "fs";
export const generateToken = (user) => {
    return jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: "7d" });
};
export const logStream = fs.createWriteStream(path.join(__dirname, "../../../access.log"), {
    flags: "a",
});
//# sourceMappingURL=utils.js.map