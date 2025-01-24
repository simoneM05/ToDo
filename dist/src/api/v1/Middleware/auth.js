import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../Config/config.js";
export const authToken = (req, res, next) => {
    let token = null;
    if (req.header("Authorization")) {
        token = req.header("Authorization").split(" ")[1];
    }
    if (token) {
        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if (err) {
                res.status(401).send({ msg: "Invalid Token" });
            }
            else {
                const userId = decoded;
                req.body._id = userId._id;
                next();
            }
        });
    }
    else {
        res.status(401).send({ msg: "Token is not supplied" });
    }
};
//# sourceMappingURL=auth.js.map