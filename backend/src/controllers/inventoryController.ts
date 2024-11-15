import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { body, validationResult } from "express-validator";
import prisma from "../db/prisma.js";

export const getDisc = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const discID = req.params.discID;
    const disc = await prisma.disc.findUnique({
      where: { id: discID },
    });

    if (!disc) {
      res.status(404).json({ message: "Error: No disc found." });
      return;
    }
    res.status(200).json(disc);
  }
);

export const createDisc = [
  body("manufacturer", "Manufacturer cannot be empty.")
    .trim()
    .isLength({ min: 1 }),
  body("name", "Name cannot be empty.").trim().isLength({ min: 1 }),
  body("weight", "Weight cannot be empty.").notEmpty().isInt(),
  body("category", "Category cannot be empty.").notEmpty().isString(),
  body("colour").isString(),
  body("speed", "Speed cannot be empty.")
    .notEmpty()
    .isFloat({ min: 1, max: 14.5 }),
  body("glide", "Glide cannot be empty.")
    .notEmpty()
    .isFloat({ min: 1, max: 7 }),
  body("turn", "Turn cannot be empty.").notEmpty().isFloat({ min: -7, max: 0 }),
  body("fade", "Fade cannot be empty.").notEmpty().isFloat({ min: 0, max: 5 }),
  body("bagID").isString().optional({ values: "falsy" }),

  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(401).json({
        errors: errors.array(),
        message: "Error: Disc creation Failure.",
      });
      return;
    }

    const manufacturer = req.body.manufacturer;
    const name = req.body.name;
    const weight = req.body.weight;
    const category = req.body.category;
    const colour = req.body.colour;
    const speed = req.body.speed;
    const glide = req.body.glide;
    const turn = req.body.turn;
    const fade = req.body.fade;
    const bagID = req.body.bagID;

    const newDisc = await prisma.disc.create({
      data: {
        manufacturer,
        name,
        weight,
        category,
        colour,
        speed,
        glide,
        turn,
        fade,
        userID: req.user.id,
        bagID: bagID ? bagID : null,
      },
    });

    res.status(200).json(newDisc);
  }),
];

export const editDisc = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // check if disc exists
    // if not, return error
    // if yes, sanitize/check form data
    // if removed from bag, also remove disc from bag entity
    // if no errors, update disc
  }
);

export const deleteDisc = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // check if disc exists
    const discToDelete = await prisma.disc.findUnique({
      where: { id: req.params.discID },
    });

    // if not, return error
    if (!discToDelete) {
      res.status(404).json({ message: "Error: Disc not found." });
      return;
    }

    // delete disc
    await prisma.disc.delete({
      where: { id: discToDelete.id },
    });

    res.status(200).json({ message: "Disc successfully deleted." });
  }
);
