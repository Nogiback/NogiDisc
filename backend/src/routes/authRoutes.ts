import express from "express";
import {
  signup,
  login,
  logout,
  getUser,
  googleAuth,
  getRefreshToken,
  verifyEmail,
  resendVerificationCode,
  forgotPassword,
  resetPassword,
} from "../controllers/authController.js";
import verifyUser from "../middleware/verifyUser.js";

const router = express.Router();

// core authentication routes
router.get("/verify", verifyUser, getUser);
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/google", googleAuth);
router.post("/refresh", getRefreshToken);

// email verification routes
router.post("/verify-email", verifyEmail);
router.post("/resend-verification", resendVerificationCode);

// password reset routes
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

export default router;
