import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { body, validationResult } from "express-validator";
import prisma from "../db/prisma.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

// SIGN UP FUNCTION

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
            email,
            firstName,
            lastName,
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

// LOGIN FUNCTION

export const login = [
  body("email", "Email must not be empty.")
    .trim()
    .isEmail()
    .isLength({ min: 1 })
    .escape(),
  body("password", "Password must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(401).json({
        errors: errors.array(),
        message: "Error: Login Failure.",
      });
      return;
    }
    const { email } = req.body;
    const user = await prisma.user.findUnique({
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        password: true,
      },
      where: { email },
    });

    if (!user) {
      res.status(401).json({ message: "No user found." });
      return;
    }

    const isValidPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isValidPassword) {
      res.status(401).json({ message: "Incorrect password." });
      return;
    }

    generateToken(user.id, res);

    res.status(200).json({
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      message: "User successfully logged in.",
    });
  }),
];

// LOGOUT FUNCTION

export const logout = (req: Request, res: Response, next: NextFunction) => {
  res.cookie("jwt", "", { maxAge: 0 });
  res.status(200).json({ message: "User logged out successfully." });
};

// GET USER FUNCTION

export const getUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await prisma.user.findUnique({ where: { id: req.user.id } });

    if (!user) {
      res.status(404).json({ message: "User not found." });
      return;
    }

    res.status(200).json({
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    });
  }
);
