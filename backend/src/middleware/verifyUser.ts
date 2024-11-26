import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import prisma from "../db/prisma.js";

interface DecodedToken extends JwtPayload {
  userID: string;
}

declare global {
  namespace Express {
    export interface Request {
      user: {
        id: string;
      };
    }
  }
}

const verifyUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({ message: "Error: No token found." });
    }

    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as DecodedToken;

    if (!decodedToken) {
      return res.status(401).json({ message: "Error: Invalid token." });
    }

    const user = await prisma.user.findUnique({
      where: { id: decodedToken.userID },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        profilePic: true,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "Error: User not found." });
    }

    req.user = user;

    next();
  } catch (err: any) {
    console.log("Error in verifyUser: ", err.message);
    res.status(500).json({ message: "Internal server error." });
  }
};

export default verifyUser;
