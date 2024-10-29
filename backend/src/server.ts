import express from "express";

import authRoutes from "./routes/authRoutes.js";
import inventoryRoutes from "./routes/inventoryRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();

// app.get("/", (req, res) => {
//   res.send("Hello World.");
// });

app.use("/api/auth", authRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/user", userRoutes);

app.listen(3000, () => console.log("Server is running on port 3000"));
