import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { body, validationResult } from "express-validator";
import prisma from "../db/prisma.js";

// GET DISC BY ID

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

// CREATE NEW DISC

export const createDisc = [
  body("brand", "Brand cannot be empty.").trim().isLength({ min: 1 }),
  body("name", "Name cannot be empty.").trim().isLength({ min: 1 }),
  body("weight", "Weight cannot be empty.").notEmpty().isInt(),
  body("category", "Category cannot be empty.").notEmpty().isString(),
  body("plastic", "Plastic type cannot be empty.").notEmpty().isString(),
  body("colour").isString(),
  body("speed", "Speed cannot be empty.")
    .notEmpty()
    .isFloat({ min: 1, max: 14.5 }),
  body("glide", "Glide cannot be empty.")
    .notEmpty()
    .isFloat({ min: 1, max: 7 }),
  body("turn", "Turn cannot be empty.").notEmpty().isFloat({ min: -7, max: 1 }),
  body("fade", "Fade cannot be empty.").notEmpty().isFloat({ min: 0, max: 6 }),
  body("bagID").isString().optional({ values: "falsy" }),
  body("image").trim().optional(),

  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(401).json({
        errors: errors.array(),
        message: "Error: Disc creation Failure.",
      });
      return;
    }

    const brand = req.body.brand;
    const name = req.body.name;
    const weight = req.body.weight;
    const category = req.body.category;
    const plastic = req.body.plastic;
    const colour = req.body.colour;
    const speed = req.body.speed;
    const glide = req.body.glide;
    const turn = req.body.turn;
    const fade = req.body.fade;
    const bagID = req.body.bagID;
    const image = req.body.image;

    const newDisc = await prisma.disc.create({
      data: {
        brand,
        name,
        weight,
        image,
        category,
        plastic,
        colour,
        speed,
        glide,
        turn,
        fade,
        userID: req.userID,
        bagID: bagID ? bagID : null,
      },
    });

    res.status(200).json(newDisc);
  }),
];

// UPDATE DISC BY ID

export const editDisc = [
  body("brand", "Brand cannot be empty.").trim().isLength({ min: 1 }),
  body("name", "Name cannot be empty.").trim().isLength({ min: 1 }),
  body("weight", "Weight cannot be empty.").notEmpty().isInt(),
  body("category", "Category cannot be empty.").notEmpty().isString(),
  body("plastic", "Plastic type cannot be empty.").notEmpty().isString(),
  body("colour").isString(),
  body("speed", "Speed cannot be empty.")
    .notEmpty()
    .isFloat({ min: 1, max: 14.5 }),
  body("glide", "Glide cannot be empty.")
    .notEmpty()
    .isFloat({ min: 1, max: 7 }),
  body("turn", "Turn cannot be empty.").notEmpty().isFloat({ min: -7, max: 1 }),
  body("fade", "Fade cannot be empty.").notEmpty().isFloat({ min: 0, max: 6 }),
  body("bagID").isString().optional({ values: "falsy" }),
  body("image").trim().optional(),

  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(401).json({
        errors: errors.array(),
        message: "Error: Disc creation Failure.",
      });
      return;
    }

    // check if disc exists
    const discID = req.params.discID;
    const checkDisc = await prisma.disc.findUnique({
      where: { id: discID },
    });

    // if not, return error
    if (!checkDisc) {
      res.status(404).json({ message: "Error: No disc found." });
      return;
    }

    // if yes, sanitize/check form data
    const brand = req.body.brand;
    const name = req.body.name;
    const weight = req.body.weight;
    const category = req.body.category;
    const plastic = req.body.plastic;
    const colour = req.body.colour;
    const speed = req.body.speed;
    const glide = req.body.glide;
    const turn = req.body.turn;
    const fade = req.body.fade;
    const bagID = req.body.bagID;
    const image = req.body.image ? req.body.image : null;

    // if no errors, update disc
    const updatedDisc = await prisma.disc.update({
      where: {
        id: discID,
      },
      data: {
        brand,
        name,
        weight,
        image,
        category,
        plastic,
        colour,
        speed,
        glide,
        turn,
        fade,
        userID: req.userID,
        bagID: bagID ? bagID : null,
      },
    });

    res.status(200).json(updatedDisc);
  }),
];

// DELETE DISC BY ID

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
