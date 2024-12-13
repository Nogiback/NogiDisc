import jwt from "jsonwebtoken";

export const generateAccessToken = (userID: string) =>
  jwt.sign({ userID: userID }, process.env.JWT_SECRET!, {
    expiresIn: "1h",
  });

export const generateRefreshToken = (userID: string) =>
  jwt.sign({ userID: userID }, process.env.REFRESH_TOKEN_SECRET!, {
    expiresIn: "15d",
  });
