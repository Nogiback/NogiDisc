import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { body, validationResult } from "express-validator";

export const createBag = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // sanitize/check form data
    // create new bag
  }
);

export const editBag = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // check if bag exists
    // if not, return error
    // if yes, sanitize/check form data
    // if no errors, update bag
  }
);

export const deleteBag = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // check if bag exists
    // if not, return error
    // if yes, sanitize/check form data
    // if no errors, update bag
  }
);
