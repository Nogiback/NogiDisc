import { Request } from "express";

declare global {
  namespace Express {
    interface Request {
      userID: string;
    }
  }
}

interface JwtPayloadWithUserID extends jwt.JwtPayload {
  userID: string;
}
