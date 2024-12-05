import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

import authRoutes from "./routes/authRoutes.js";
import inventoryRoutes from "./routes/inventoryRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import bagRoutes from "./routes/bagRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/user", userRoutes);
app.use("/api/bag", bagRoutes);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
