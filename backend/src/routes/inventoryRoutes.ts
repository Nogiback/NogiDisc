import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Inventory route");
});

export default router;
