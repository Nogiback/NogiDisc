import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { body, validationResult } from "express-validator";
import prisma from "../db/prisma.js";

export const getUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const currentUserID = req.user.id;
    const currentUser = await prisma.user.findUnique({
      omit: {
        password: true,
      },
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
  async (req: Request, res: Response, next: NextFunction) => {}
);

export const getAllUserBags = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {}
);

export const getUserBag = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {}
);

export const updateUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {}
);

export const deleteUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {}
);
