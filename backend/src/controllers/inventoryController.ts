import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { body, validationResult } from "express-validator";

export const getDisc = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {}
);

export const createDisc = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {}
);

export const editDisc = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {}
);

export const deleteDisc = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {}
);
