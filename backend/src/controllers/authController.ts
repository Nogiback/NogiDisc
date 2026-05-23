import dotenv from "dotenv";
dotenv.config();
import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { body, validationResult } from "express-validator";
import prisma from "../db/prisma.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { OAuth2Client, TokenPayload } from "google-auth-library";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateTokens.js";
import { JwtPayloadWithUserID } from "../types/types.js";
import { sendVerificationEmail, sendPasswordResetEmail } from "../utils/sendEmail.js";

const googleClient = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  "postmessage"
);

// SIGN UP FUNCTION
export const signup = [
  body("email", "Invalid email.")
    .trim()
    .isEmail()
    .isLength({ min: 1 })
    .escape(),
  body("firstName", "First Name must not be empty.")
    .trim()
    .escape()
    .isLength({ min: 1 }),
  body("lastName", "Last Name must not be empty.")
    .trim()
    .escape()
    .isLength({ min: 1 }),
  body("password", "Password must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("confirmPassword", "Passwords must match.")
    .custom((value, { req }) => value === req.body.password)
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({
        errors: errors.array(),
        message: "Error: Sign up failure.",
      });
      return;
    }

    const { email, firstName, lastName, password } = req.body;
    const duplicateUser = await prisma.user.findUnique({
      where: { email },
    });

    if (duplicateUser) {
      res.status(409).json({
        message: "Error: User already exists.",
      });
      return;
    }

    bcrypt.hash(password, 10, async (err, hashedPassword) => {
      if (err) {
        res.status(500).json({ err });
        return;
      } else {
        const newUser = await prisma.user.create({
          data: {
            email,
            firstName,
            lastName,
            password: hashedPassword,
            isEmailVerified: false,
          },
        });

        const code = Math.floor(100000 + Math.random() * 900000).toString();

        await prisma.emailVerificationCode.create({
          data: {
            code,
            userID: newUser.id,
            expiresAt: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes
          },
        });

        await sendVerificationEmail(newUser.email, code);

        res.status(200).json({
          message: "User created. Please check your email for the verification code.",
          email: newUser.email,
        });
      }
    });
  }),
];

// VERIFY EMAIL FUNCTION
export const verifyEmail = [
  body("email", "Invalid email.").isEmail(),
  body("code", "Code is required").isLength({ min: 6, max: 6 }),

  asyncHandler(async (req, res, next) => {
    const { email, code } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      res.status(404).json({ message: "User not found." });
      return;
    }

    const verificationRecord = await prisma.emailVerificationCode.findFirst({
      where: { userID: user.id, code },
      orderBy: { createdAt: "desc" },
    });

    if (!verificationRecord) {
      res.status(400).json({ message: "Invalid verification code." });
      return;
    }

    if (verificationRecord.expiresAt < new Date()) {
      res.status(400).json({ message: "Verification code has expired." });
      return;
    }

    await prisma.user.update({
      where: { id: user.id },
      data: { isEmailVerified: true },
    });

    await prisma.emailVerificationCode.deleteMany({
      where: { userID: user.id },
    });

    // Logging the user in immediately after verification
    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userID: user.id,
        expiresAt: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
      },
    });

    res.cookie("refreshToken", refreshToken, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "development",
    });

    res.status(200).json({
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      profilePic: user.profilePic,
      googleID: user.googleID,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      accessToken,
      message: "Email verified successfully.",
    });
  }),
];

// RESEND VERIFICATION CODE
export const resendVerificationCode = [
  body("email", "Invalid email.").isEmail(),
  asyncHandler(async (req, res, next) => {
    const { email } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    
    if (!user) {
      res.status(404).json({ message: "User not found." });
      return;
    }
    
    if (user.isEmailVerified) {
      res.status(400).json({ message: "Email is already verified." });
      return;
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();

    await prisma.emailVerificationCode.create({
      data: {
        code,
        userID: user.id,
        expiresAt: new Date(Date.now() + 15 * 60 * 1000),
      },
    });

    await sendVerificationEmail(user.email, code);

    res.status(200).json({ message: "Verification code sent." });
  })
];

// LOGIN FUNCTION
export const login = [
  body("email", "Email must not be empty.")
    .trim()
    .isEmail()
    .isLength({ min: 1 })
    .escape(),
  body("password", "Password must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({
        errors: errors.array(),
        message: "Error: Login Failure.",
      });
      return;
    }
    const { email } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        password: true,
        googleID: true,
        profilePic: true,
        createdAt: true,
        updatedAt: true,
        bags: true,
        inventory: true,
        isEmailVerified: true,
      },
    });

    if (!user) {
      res.status(401).json({ message: "Error: No user found." });
      return;
    }

    if (!user.password) {
      res.status(403).json({ message: "This account was created via Google. Please log in with Google, or use 'Forgot Password' to set a manual password." });
      return;
    }

    const isValidPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isValidPassword) {
      res.status(401).json({ message: "Error: Incorrect password." });
      return;
    }

    if (!user.isEmailVerified) {
      res.status(403).json({ 
        message: "Please verify your email before logging in.",
        isEmailVerified: false,
        email: user.email
      });
      return;
    }

    const existingToken = await prisma.refreshToken.findMany({
      where: { userID: user.id },
    });

    if (existingToken) {
      await prisma.refreshToken.deleteMany({
        where: { userID: user.id },
      });
    }

    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userID: user.id,
        expiresAt: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
      },
    });

    res.cookie("refreshToken", refreshToken, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "development",
    });

    res.status(200).json({
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      profilePic: user.profilePic,
      googleID: user.googleID,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      bags: user.bags,
      inventory: user.inventory,
      accessToken: accessToken,
      message: "User successfully logged in.",
    });
  }),
];

// LOGOUT FUNCTION
export const logout = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      res.status(401).json({ message: "Error: No token provided." });
      return;
    }

    await prisma.refreshToken.deleteMany({
      where: {
        token: refreshToken,
      },
    });

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
    });

    res.status(200).json({ message: "User successfully logged out." });
  }
);

// GET USER FUNCTION
export const getUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await prisma.user.findUnique({
      where: { id: req.userID },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        googleID: true,
        profilePic: true,
        createdAt: true,
        updatedAt: true,
        bags: true,
        inventory: true,
      },
    });

    if (!user) {
      res.status(404).json({ message: "Error: User not found." });
      return;
    }

    res.status(200).json(user);
  }
);

// GOOGLE LOGIN / SIGNUP FUNCTION
export const googleAuth = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { tokens } = await googleClient.getToken(req.body.code);

    if (!tokens.id_token) {
      res.status(401).json({ message: "Error: No tokens found." });
      return;
    }

    const ticket = await googleClient.verifyIdToken({
      idToken: tokens.id_token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload() as TokenPayload;

    if (!payload) {
      res.status(401).json({ message: "Error: Invalid Google token payload." });
      return;
    }

    const {
      sub: googleID,
      given_name: firstName,
      family_name: lastName,
      picture: profilePic,
      email,
    } = payload;

    if (!email || !firstName || !lastName) {
      res.status(401).json({
        message: "Error: Email and full name is required for Google authentication.",
      });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true, email: true, firstName: true, lastName: true, googleID: true,
        profilePic: true, createdAt: true, updatedAt: true, bags: true, inventory: true,
      },
    });

    if (!user) {
      let cleanURL;
      if (profilePic?.includes("=")) {
        cleanURL = profilePic.split("=")[0];
      }

      const newUser = await prisma.user.create({
        data: {
          email,
          firstName,
          lastName,
          profilePic: cleanURL,
          googleID,
          password: null, // Left empty for Google users
          isEmailVerified: true, // Google verifies emails
        },
      });

      const accessToken = generateAccessToken(newUser.id);
      const refreshToken = generateRefreshToken(newUser.id);

      await prisma.refreshToken.create({
        data: {
          token: refreshToken,
          userID: newUser.id,
          expiresAt: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
        },
      });

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        maxAge: 15 * 24 * 60 * 60 * 1000,
      });

      res.status(200).json({
        ...newUser,
        accessToken,
        message: "User successfully signed up via Google.",
      });
      return;
    }

    const existingToken = await prisma.refreshToken.findMany({
      where: { userID: user.id },
    });

    if (existingToken) {
      await prisma.refreshToken.deleteMany({
        where: { userID: user.id },
      });
    }

    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userID: user.id,
        expiresAt: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
      },
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 15 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      ...user,
      accessToken,
      message: "User successfully logged in via Google.",
    });
  }
);

// REFRESH TOKEN FUNCTION
export const getRefreshToken = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      res.status(204).send();
      return;
    }

    const tokenData = await prisma.refreshToken.findUnique({
      where: { token: refreshToken },
    });

    if (!tokenData) {
      res.status(403).json({ message: "Error: Invalid refresh token" });
      return;
    }

    const payload = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET!
    ) as JwtPayloadWithUserID;

    const newAccessToken = generateAccessToken(payload.userID);

    res.status(200).json({ accessToken: newAccessToken });
  }
);

// FORGOT PASSWORD
export const forgotPassword = [
  body("email", "Invalid email.").isEmail(),
  asyncHandler(async (req, res, next) => {
    const { email } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      res.status(404).json({ message: "User not found." });
      return;
    }

    const token = crypto.randomBytes(32).toString("hex");

    await prisma.passwordResetToken.create({
      data: {
        token,
        userID: user.id,
        expiresAt: new Date(Date.now() + 15 * 60 * 1000), // 15 mins
      },
    });

    await sendPasswordResetEmail(user.email, token);

    res.status(200).json({ message: "Password reset link sent to email." });
  })
];

// RESET PASSWORD
export const resetPassword = [
  body("token", "Token is required.").notEmpty(),
  body("password", "Password must be at least 6 characters.").isLength({ min: 6 }),
  asyncHandler(async (req, res, next) => {
    const { token, password } = req.body;

    const resetRecord = await prisma.passwordResetToken.findUnique({
      where: { token },
      include: { user: true }
    });

    if (!resetRecord || resetRecord.expiresAt < new Date()) {
      res.status(400).json({ message: "Invalid or expired reset token." });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.update({
      where: { id: resetRecord.userID },
      data: { password: hashedPassword }
    });

    await prisma.passwordResetToken.deleteMany({
      where: { userID: resetRecord.userID },
    });

    res.status(200).json({ message: "Password has been successfully reset. You can now log in." });
  })
];
