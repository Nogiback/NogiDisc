import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { body, validationResult } from "express-validator";
import prisma from "../db/prisma.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

export const signup = [
  body("email", "Email must not be empty.")
    .trim()
    .isEmail()
    .isLength({ min: 1 })
    .escape(),
  body("firstName", "First Name must not be empty.").trim().escape(),
  body("lastName", "Last Name must not be empty.").trim().escape(),
  body("password", "Password must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("confirmPassword", "Passwords must match.")
    .custom((value, { req }) => value === req.body.password)
    .escape(),

  asyncHandler(async (req, res, next) => {
    const { email, firstName, lastName, password, confirmPassword } = req.body;
    const duplicateUser = await prisma.user.findUnique({
      where: { email },
    });
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({
        errors: errors.array(),
        message: "Error: Sign up failure.",
      });
      return;
    }

    if (duplicateUser) {
      res.status(409).json({
        message: "Error: User already exists.",
      });
      return;
    }

    // Hashing Password

    bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
      if (err) {
        res.status(500).json({ err });
        return;
      } else {
        const newUser = await prisma.user.create({
          data: {
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: hashedPassword,
          },
        });

        // Generating token for auth
        generateToken(newUser.id, res);

        res.status(201).json({
          id: newUser.id,
          email: newUser.email,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          message: "New user created successfully.",
        });
      }
    });
  }),
];

export const login = async (req: Request, res: Response) => {};
export const logout = async (req: Request, res: Response) => {};
