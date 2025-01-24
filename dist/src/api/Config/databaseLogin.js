import mongoose from "mongoose";
const MONGO_URI = process.env.MONGO_URI;
export const loginDB = () => {
    mongoose
        .connect(MONGO_URI)
        .then(() => {
        console.log("MongoDB connected");
    })
        .catch((err) => {
        console.error("MongoDB connection error:", err);
    });
};
//# sourceMappingURL=databaseLogin.js.map