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

export const updateUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // lookup user
    // if no user, send error
    // if user, sanitize/check form data
    // update user and return 200
  }
);

export const deleteUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // lookup user
    // if no user, send error
    // if user, check for bags and discs
    // if bags and discs, delete discs then delete bags
    // delete user and return 200
  }
);
