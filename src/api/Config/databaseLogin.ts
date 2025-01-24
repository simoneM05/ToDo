import mongoose from "mongoose";

const MONGO_URI: string = process.env.MONGO_URI!;

export const loginDB = () => {
  mongoose
    .connect(MONGO_URI)
    .then(() => {
      console.log("MongoDB connected");
    })
    .catch((err: Error) => {
      console.error("MongoDB connection error:", err);
    });
};
