import { Request, Response, NextFunction } from "express";
import { CookieType } from "../types/cookie";
import currentDate from "../helper/currentDay";
export default async function Refresh(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const cookie = req.cookies.DeatCode_Auth as CookieType;

  const since_last_solved = (currentDate(true) as number) - cookie.lastSolved;

  if (since_last_solved > 24 * 60 * 60 * 1000) {
    next();
  }

  res.send(200).json({ desc: "Today's problem solved", problemStatus: false });
}
