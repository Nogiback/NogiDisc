import express from "express";
import verifyUser from "../middleware/verifyUser.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Inventory route");
});

export default router;
