import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { body, validationResult } from "express-validator";
import prisma from "../db/prisma.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

// SIGN UP FUNCTION

export const signup = [
  body("email", "Invalid email.")
    .trim()
    .isEmail()
    .isLength({ min: 1 })
    .escape(),
  body("firstName", "First Name must not be empty.")
    .trim()
    .escape()
    .isLength({ min: 1 }),
  body("lastName", "Last Name must not be empty.")
    .trim()
    .escape()
    .isLength({ min: 1 }),
  body("password", "Password must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("confirmPassword", "Passwords must match.")
    .custom((value, { req }) => value === req.body.password)
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({
        errors: errors.array(),
        message: "Error: Sign up failure.",
      });
      return;
    }

    const { email, firstName, lastName, password } = req.body;
    const duplicateUser = await prisma.user.findUnique({
      where: { email },
    });

    if (duplicateUser) {
      res.status(409).json({
        message: "Error: User already exists.",
      });
      return;
    }

    // Hashing Password

    bcrypt.hash(password, 10, async (err, hashedPassword) => {
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
          profilePic: newUser.profilePic,
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
      where: { email },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        password: true,
        profilePic: true,
      },
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
      profilePic: user.profilePic,
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
      profilePic: user.profilePic,
    });
  }
);

// GOOGLE LOGIN / SIGNUP FUNCTION

export const googleAuth = [
  body("email", "Invalid email.")
    .trim()
    .isEmail()
    .isLength({ min: 1 })
    .escape(),
  body("firstName", "First Name must not be empty.")
    .trim()
    .escape()
    .isLength({ min: 1 }),
  body("lastName", "Last Name must not be empty.")
    .trim()
    .escape()
    .isLength({ min: 1 }),
  body("profilePic").optional().isString(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({
        errors: errors.array(),
        message: "Error: Sign up failure.",
      });
      return;
    }

    const { email, firstName, lastName, profilePic } = req.body;
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // if a user exists with the google email, log them in
    if (user) {
      generateToken(user.id, res);
      res.status(200).json({
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        profilePic: user.profilePic,
        message: "User successfully logged in.",
      });
      return;
    }

    // if no user exists, create one with the google info and log them in
    if (!user) {
      const generatedPassword = Math.random().toString(36).slice(2);
      bcrypt.hash(generatedPassword, 10, async (err, hashedPassword) => {
        if (err) {
          res.status(500).json({ err });
          return;
        } else {
          const newUser = await prisma.user.create({
            data: {
              email,
              firstName,
              lastName,
              profilePic,
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
            profilePic: newUser.profilePic,
            message: "New Google user created successfully.",
          });
        }
      });
    }
  }),
];
