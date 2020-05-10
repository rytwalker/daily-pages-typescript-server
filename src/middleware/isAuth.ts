import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export default function isAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!);
      req.writerData = decoded as any;
      next();
    } else {
      return res.status(401).json({ message: "Token is invalid" });
    }
  } catch (error) {
    return res.status(401).json({
      message: "Authentication Failed"
    });
  }
}
