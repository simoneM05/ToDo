import e from "express";
import mongoose from "mongoose";
import userRoutes from "./Routes/user.routes.js";
import taskRoutes from "./Routes/task.routes.js";
import cors from "cors";
import { MONGO_URI, PORT } from "./Config/config.js";

const app = e();

// Middleware
app.use(e.json());
app.use(cors());
app.use("/v1/api/user", userRoutes);
app.use("/v1/api/task", taskRoutes);

// MongoDB connection
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err: Error) => {
    console.error("MongoDB connection error:", err);
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
