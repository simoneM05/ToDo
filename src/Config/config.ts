import dotenv from "dotenv";

dotenv.config();

export const JWT_SECRET: string = process.env.JWT_SECRET!;

export const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
export const MONGO_URI: string = process.env.MONGO_URI!;
