import { Request, Response, NextFunction } from "express";
import { CookieType } from "../types/cookie";
import currentDate from "../helper/currentDay";
import { verify } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export default async function Refresh(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const cookie = req.cookies.DeatCode_Auth;

  try {
    const data = verify(cookie, process.env.JWT_KEY as any) as CookieType;
    const since_last_solved =
      (currentDate(true) as number) - data.latestCompletion;
    if (data.latestCompletion === 0) {
      //check if its a new person
      next();
    } else if (since_last_solved > 24 * 60 * 60 * 1000) {
      // person coming back
      next();
    } else {
      // already did problem today
      res
        .status(200)
        .json({ desc: "Today's problem solved", redirectURL: false });
      return;
    }
  } catch {
    res.json({ desc: "No cookie found", redirectURL: "/Login" });
    return;
  }
}

function setProblem() {
  // set the user current problem
  /*
    * Grab user and check if they have logged in today
    * Yes, dont set a new problem and go next()
    * No, set a new problem
    *  
  */
}
