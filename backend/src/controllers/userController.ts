import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { body, validationResult } from "express-validator";
import prisma from "../db/prisma.js";

export const getAllUsers = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {}
);

export const getUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {}
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
