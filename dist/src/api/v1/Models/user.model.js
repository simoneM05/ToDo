import { Schema, model } from "mongoose";
const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: { type: String, required: true, unique: true },
});
const User = model("User", UserSchema);
export { User };
//# sourceMappingURL=user.model.js.map