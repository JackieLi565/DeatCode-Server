import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export async function jwtAuth(req: Request, res: Response, next: NextFunction) {
  const cookie = req.cookies.DeatCode_Auth;

  const data = verify(cookie, process.env.JWT_KEY as any);
  if (!data) {
    res.status(200).json({ desc: "not a user", redirectURL: "/login" });
    return;
  }
  next();
}
