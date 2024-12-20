import dotenv from "dotenv";
dotenv.config();
import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { body, validationResult } from "express-validator";
import prisma from "../db/prisma.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { OAuth2Client, TokenPayload } from "google-auth-library";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateTokens.js";
import { JwtPayloadWithUserID } from "../types/types.js";

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

    // Hashing Password

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
          },
        });

        // Generating tokens for auth
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
          maxAge: 15 * 24 * 60 * 60 * 1000, // in milliseconds
          httpOnly: true, // prevent XSS attacks cross-site scripting attacks,
          sameSite: "strict", // CSRF attacks cross-site request forgery attacks
          secure: process.env.NODE_ENV !== "development",
        });

        res.status(200).json({
          id: newUser.id,
          email: newUser.email,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          profilePic: newUser.profilePic,
          googleID: newUser.googleID,
          createdAt: newUser.createdAt,
          updatedAt: newUser.updatedAt,
          accessToken: accessToken,
          message: "New user created successfully.",
        });
      }
    });
  }),
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
      },
    });

    if (!user) {
      res.status(401).json({ message: "Error: No user found." });
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

    // Generating tokens for auth
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
      maxAge: 15 * 24 * 60 * 60 * 1000, // in milliseconds
      httpOnly: true, // prevent XSS attacks cross-site scripting attacks,
      sameSite: "strict", // CSRF attacks cross-site request forgery attacks
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
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({
        errors: errors.array(),
        message: "Error: Logout Failure.",
      });
      return;
    }

    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      res.status(401).json({ message: "Error: No token provided." });
      return;
    }

    await prisma.refreshToken.delete({
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
    });
  }
);

// GOOGLE LOGIN / SIGNUP FUNCTION

export const googleAuth = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({
        errors: errors.array(),
        message: "Error: Google sign up failure.",
      });
      return;
    }

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
        message:
          "Error: Email and full name is required for Google authentication.",
      });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { email },
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

    // if no user is found on db, hash a password and create a new user and login
    if (!user) {
      const generatedPassword = Math.random().toString(36).slice(2);
      bcrypt.hash(generatedPassword, 10, async (err, hashedPassword) => {
        if (err) {
          res.status(500).json({ err });
          return;
        }

        // Removing Google's profile picture sizing constraint
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
            password: hashedPassword,
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
          id: newUser.id,
          email: newUser.email,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          profilePic: newUser.profilePic,
          googleID: newUser.googleID,
          createdAt: newUser.createdAt,
          updatedAt: newUser.updatedAt,
          accessToken: accessToken,
          message: "User successfully signed up via Google.",
        });
      });
      return;
    }

    // If a user is found, generate tokens and return user
    const accessToken = generateAccessToken(user!.id);
    const refreshToken = generateRefreshToken(user!.id);

    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userID: user!.id,
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
      message: "User successfully logged in via Google.",
    });
  }
);

// GET NEW ACCESS TOKEN FROM REFRESH TOKEN

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
