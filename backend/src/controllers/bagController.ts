import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { body, validationResult } from "express-validator";

export const createBag = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {}
);

export const editBag = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {}
);

export const deleteBag = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {}
);
