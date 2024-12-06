import express from "express";
import {
  signup,
  login,
  logout,
  getUser,
  googleAuth,
  getRefreshToken,
} from "../controllers/authController.js";
import verifyUser from "../middleware/verifyUser.js";

const router = express.Router();

router.get("/verify", verifyUser, getUser);
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/google", googleAuth);
router.post("/refresh", getRefreshToken);

export default router;
