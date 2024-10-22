import express from "express";
// import { signup, login, logout } from "../controllers/authController.ts";

const router = express.Router();

router.get("/login", (req, res) => {
  res.send("Logged in successfully");
});

router.get("/logout", (req, res) => {
  res.send("Logged out successfully");
});

router.get("/signup", (req, res) => {
  res.send("Signed up successfully");
});

// router.post("/signup", signup);
// router.post("/login", login);
// router.post("/logout", logout);

export default router;
