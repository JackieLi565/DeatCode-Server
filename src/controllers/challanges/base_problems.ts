// Get user
// check last problem
// give random problem

import { Request, Response } from "express";
import ref from "../../config/MongoConfig";
import { verify } from "jsonwebtoken";
import { CookieType } from "../../types/cookie";
import currentDate from "../../helper/currentDay";

export default async function custom_problems(req: Request, res: Response) {
  const collection = ref("challanges");
  const { cookies } = req;

  if (!cookies.DeatCode_Auth) {
    res.send(201).json({ desc: "Error, no cookie", redirectURL: "/login" });
    return;
  }

  const cookie_data = verify(
    cookies.DeatCode_Auth,
    process.env.JWT_KEY as string
  ) as CookieType;

  // if current date has a time diff of 24hr or 24 * 60 * 60 * 1000 millisec
  if (dateDiff(cookie_data.lastSolved) <= 24 * 60 * 60 * 1000) {
    res
      .send(201)
      .json({ desc: "Completed todays problem", problemStatus: false });
    return;
  }

  // get a random problem from database
}

const dateDiff = (prev: number) => {
  const currentTime = currentDate(true);
  if (typeof currentTime === "number") {
    return currentTime - prev;
  }
  return prev;
};
