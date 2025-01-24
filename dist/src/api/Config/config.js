import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";
dotenv.config();
export const JWT_SECRET = process.env.JWT_SECRET;
export const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);
//# sourceMappingURL=config.js.map