import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { body, validationResult } from "express-validator";
import prisma from "../db/prisma.js";

// GET UNIQUE BAG BY ID

export const getBag = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const bagID = req.params.bagID;
    const bag = await prisma.bag.findUnique({
      where: { id: bagID },
      include: {
        discs: true,
      },
    });

    if (!bag) {
      res.status(404).json({ message: "Error: No bag found." });
      return;
    }
    res.status(200).json(bag);
  }
);

// CREATE NEW BAG

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

    const bagName = req.body.name;

    const isNameTaken = await prisma.bag.findUnique({
      where: { name: bagName },
    });

    if (isNameTaken) {
      res
        .status(409)
        .json({ message: "Error: A bag with that name already exists." });
      return;
    }

    const newBag = await prisma.bag.create({
      data: {
        name: bagName,
        userID: req.userID,
      },
    });

    res.status(200).json(newBag);
  }),
];

// EDIT BAG BY ID

export const editBag = [
  body("name").trim().optional(),

  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(401).json({
        errors: errors.array(),
        message: "Error: Bag creation Failure.",
      });
      return;
    }

    // check if bag exists
    const bagID = req.params.bagID;

    const checkBag = await prisma.bag.findUnique({
      where: { id: bagID },
    });

    // if not, return error
    if (!checkBag) {
      res.status(404).json({ message: "Error: No bag found." });
      return;
    }

    // if yes, sanitize/check form data
    const newBagName = req.body.name ? req.body.name : checkBag.name;

    const isNameTaken = await prisma.bag.findUnique({
      where: { name: newBagName },
    });

    if (isNameTaken) {
      res
        .status(409)
        .json({ message: "Error: A bag with that name already exists." });
      return;
    }

    // if no errors, update bag
    const updatedBag = await prisma.bag.update({
      where: {
        id: bagID,
      },
      data: {
        name: newBagName,
      },
    });

    res.status(200).json(updatedBag);
  }),
];

// DELETE BAG BY ID

export const deleteBag = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // check if bag exists
    const bagToDelete = await prisma.bag.findUnique({
      where: { id: req.params.bagID },
    });

    // if not, return error
    if (!bagToDelete) {
      res.status(404).json({ message: "Error: Bag not found." });
      return;
    }

    // check if bag has discs, if so, remove bagID from discs
    const discsToUpdate = await prisma.disc.findMany({
      where: {
        bagID: req.params.bagID,
      },
    });

    if (discsToUpdate) {
      for (const disc of discsToUpdate) {
        await prisma.disc.update({
          where: {
            id: disc.id,
          },
          data: {
            bagID: null,
          },
        });
      }
    }

    // delete bag
    await prisma.bag.delete({
      where: { id: bagToDelete.id },
    });

    res.status(200).json({ message: "Bag successfully deleted." });
  }
);
