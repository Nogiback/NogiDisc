import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { body, validationResult } from "express-validator";
import prisma from "../db/prisma.js";

export const createBag = [
  body("name", "Name cannot be empty.").trim().isLength({ min: 1 }),

  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(401).json({
        errors: errors.array(),
        message: "Error: Bag creation Failure.",
      });
      return;
    }

    const name = req.body.name;

    const newBag = await prisma.bag.create({
      data: {
        name,
        userID: req.user.id,
      },
    });

    res.status(200).json(newBag);
  }),
];

export const editBag = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // check if bag exists
    // if not, return error
    // if yes, sanitize/check form data
    // if removing disc, also remove bag from disc entity
    // if no errors, update bag
  }
);

export const deleteBag = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // check if bag exists
    // if not, return error
    // if yes, check bag for discs
    // if discs exist, update discs to remove bag id
    // delete bag
  }
);
