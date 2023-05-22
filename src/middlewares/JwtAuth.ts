import { NextFunction, Request, Response } from "express";
import { verifyJWT } from "../helper/token";

export default async function jwtAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { cookies } = req;

  try {
    verifyJWT(cookies.DeatCode_Auth);
    next();
  } catch {
    res.status(401).send("unAuthorized");
    return;
  }
}
