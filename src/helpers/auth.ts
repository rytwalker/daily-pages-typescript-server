import { sign } from "jsonwebtoken";
import { Response } from "express";

export const createAccessToken = (writer: any) => {
  return sign({ writerId: writer.id }, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: "15m"
  });
};

export const createRefreshToken = (writer: any) => {
  return sign(
    { writerId: writer.id, tokenVersion: writer.tokenVersion },
    process.env.REFRESH_TOKEN_SECRET!,
    {
      expiresIn: "7d"
    }
  );
};

export const sendRefreshToken = (res: Response, token: string) => {
  res.cookie("rid", token, {
    httpOnly: true
    // path: "/api/v1/writers/refresh-token"
  });
};
