import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { body, validationResult } from "express-validator";
import prisma from "../db/prisma.js";

export const getUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const currentUserID = req.user.id;
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
    const currentUserID = req.user.id;
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
    const currentUserID = req.user.id;
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

  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    // lookup user
    const currentUserID = req.user.id;
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
      },
    });

    res.status(200).json(updatedUser);
  }),
];

export const deleteUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // lookup user
    const currentUserID = req.user.id;
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
