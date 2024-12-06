import { Request } from "express";

declare global {
  namespace Express {
    interface Request {
      userID: string;
    }
  }
}

interface JwtPayloadWithID extends jwt.JwtPayload {
  id: string;
}
