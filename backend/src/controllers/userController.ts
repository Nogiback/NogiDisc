import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { body, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import prisma from "../db/prisma.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateTokens.js";

export const getUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const currentUserID = req.userID;
    const currentUser = await prisma.user.findUnique({
      where: { id: currentUserID },
    });

    if (!currentUser) {
      res.status(404).json({ message: "Error: No user found." });
      return;
    }
    res.status(200).json(currentUser);
  }
);

export const getUserInventory = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // lookup user
    const currentUserID = req.userID;
    const currentUser = await prisma.user.findUnique({
      where: { id: currentUserID },
    });

    // if no user, send error
    if (!currentUser) {
      res.status(404).json({ message: "Error: No user found." });
      return;
    }

    // lookup all user's discs
    const discs = await prisma.disc.findMany({
      where: {
        userID: currentUserID,
      },
    });

    // return all discs
    res.status(200).json(discs);
  }
);

export const getAllUserBags = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // lookup user
    const currentUserID = req.userID;
    const currentUser = await prisma.user.findUnique({
      where: { id: currentUserID },
    });

    // if no user, send error
    if (!currentUser) {
      res.status(404).json({ message: "Error: No user found." });
      return;
    }

    // lookup all user's bags
    const bags = await prisma.bag.findMany({
      where: {
        userID: currentUserID,
      },
    });

    // return all bags
    res.status(200).json(bags);
  }
);

export const updateUser = [
  body("email", "Email must not be empty.")
    .trim()
    .isEmail()
    .isLength({ min: 1 })
    .escape(),
  body("firstName", "First Name must not be empty.").trim().escape(),
  body("lastName", "Last Name must not be empty.").trim().escape(),
  body("profilePic").trim().optional(),

  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    // lookup user
    const currentUserID = req.userID;
    const currentUser = await prisma.user.findUnique({
      where: { id: currentUserID },
    });

    // if no user, send error
    if (!currentUser) {
      res.status(404).json({ message: "Error: No user found." });
      return;
    }

    // if user, sanitize/check form data

    const duplicateUser = await prisma.user.findUnique({
      where: { email: req.body.email },
    });

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({
        errors: errors.array(),
        message: "Error: User update failure.",
      });
      return;
    }

    if (duplicateUser && duplicateUser.id !== currentUserID) {
      res.status(409).json({
        message: "Error: Email already exists.",
      });
      return;
    }

    // if not errors, update user and return 200
    let updatedUser = await prisma.user.update({
      where: { id: currentUserID },
      data: {
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        profilePic: req.body.profilePic,
      },
    });

    res.status(200).json(updatedUser);
  }),
];

export const updatePassword = [
  body("currentPassword", "Current password must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("newPassword", "New password must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("confirmNewPassword", "Passwords must match.")
    .custom((value, { req }) => value === req.body.newPassword)
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

    // check if user exists
    const user = await prisma.user.findUnique({
      where: { id: req.userID },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        password: true,
      },
    });

    // if not, return error
    if (!user) {
      res.status(401).json({ message: "No user found." });
      return;
    }

    // check if the current password is valid
    const isValidPassword = await bcrypt.compare(
      req.body.currentPassword,
      user.password
    );

    // if not, return error
    if (!isValidPassword) {
      res.status(401).json({ message: "Incorrect password." });
      return;
    }

    // if yes, hash the new password
    bcrypt.hash(req.body.newPassword, 10, async (err, hashedPassword) => {
      if (err) {
        res.status(500).json({ err });
        return;
      } else {
        const { refreshToken } = req.cookies;
        const updatedUser = await prisma.user.update({
          where: { id: req.userID },
          data: {
            password: hashedPassword,
          },
        });

        if (!refreshToken) {
          res.status(400).json({ message: "Error: No token provided." });
          return;
        }

        // Clearing old tokens from storage/cookies/db
        await prisma.refreshToken.delete({ where: { token: refreshToken } });
        res.clearCookie("refreshToken", {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
        });

        // Generating new tokens for auth
        const newAccessToken = generateAccessToken(user.id);
        const newRefreshToken = generateRefreshToken(user.id);

        await prisma.refreshToken.create({
          data: {
            token: newRefreshToken,
            userID: user.id,
            expiresAt: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
          },
        });

        res.status(201).json({
          id: updatedUser.id,
          email: updatedUser.email,
          firstName: updatedUser.firstName,
          lastName: updatedUser.lastName,
          profilePic: updatedUser.profilePic,
          accessToken: newAccessToken,
          message: "User updated password successfully.",
        });
      }
    });
  }),
];

export const deleteUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // lookup user
    const currentUserID = req.userID;
    const currentUser = await prisma.user.findUnique({
      where: { id: currentUserID },
    });

    // if no user, send error
    if (!currentUser) {
      res.status(404).json({ message: "Error: No user found." });
      return;
    }

    // if user, check for bags and discs
    const userDiscs = await prisma.disc.findMany({
      where: {
        userID: currentUserID,
      },
    });

    const userBags = await prisma.bag.findMany({
      where: {
        userID: currentUserID,
      },
    });

    // if bags and discs, delete discs then delete bags
    if (userDiscs) {
      await prisma.disc.deleteMany({
        where: {
          userID: currentUserID,
        },
      });
    }

    if (userBags) {
      await prisma.bag.deleteMany({
        where: {
          userID: currentUserID,
        },
      });
    }

    // delete user and return 200
    await prisma.user.delete({
      where: {
        id: currentUserID,
      },
    });

    res.status(200).json({
      message: "User successfully deleted.",
    });
  }
);
