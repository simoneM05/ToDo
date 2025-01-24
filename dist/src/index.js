import e from "express";
import userRoutes from "./api/v1/Routers/user.routes.js";
import taskRoutes from "./api/v1/Routers/task.routes.js";
import cors from "cors";
import morgan from "morgan";
import { PORT } from "./api/Config/config.js";
import { loginDB } from "./api/Config/databaseLogin.js";
import { logStream } from "./api/v1/Utils/utils.js";
const app = e();
// Middleware
app.use(e.json());
app.use(cors());
app.use(morgan(":method :url :status :res[content-length] - :response-time ms", {
    stream: logStream,
}));
app.use("/api/user", userRoutes);
app.use("/api/task", taskRoutes);
// MongoDB connection
loginDB();
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
//# sourceMappingURL=index.js.map