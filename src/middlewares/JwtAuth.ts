import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export default async function jwtAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const cookie = req.cookies.DeatCode_Auth;
    verify(cookie, process.env.JWT_KEY as any);
  } catch {
    res.status(200).json({ desc: "jwtAuth", redirectURL: "/login" });
    return;
  }

  next();
}
