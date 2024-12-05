import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface DecodedToken extends JwtPayload {
  userID: string;
}

const verifyUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      res.status(401).json({ message: "Error: No token found." });
      return;
    }

    const token = authHeader.split(" ")[1];

    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as DecodedToken;

    if (!decodedToken) {
      res.status(403).json({ message: "Error: Token expired or invalid." });
      return;
    }

    req.userID = decodedToken.userID;

    next();
  } catch (err: any) {
    console.log("Error in verifyUser: ", err.message);
    res.status(500).json({ message: "Internal server error." });
  }
};

export default verifyUser;
