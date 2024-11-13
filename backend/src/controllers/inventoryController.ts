import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { body, validationResult } from "express-validator";

export const getDisc = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // check if discs exists,
    // if not, return error
    // if yes, return disc
  }
);

export const createDisc = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // sanitize/check form data
    // create disc
  }
);

export const editDisc = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // check if disc exists
    // if not, return error
    // if yes, sanitize/check form data
    // if no errors, update disc
  }
);

export const deleteDisc = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // check if bag exists
    // if not, return error
    // if yes, check bag for discs
    // if discs exist, update discs to remove bag id
    // delete bag
  }
);
