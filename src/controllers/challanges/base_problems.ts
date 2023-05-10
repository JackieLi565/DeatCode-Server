// Get user
// check last problem
// give random problem

import { Request, Response } from "express";
import ref from "../../config/MongoConfig";
import { verify } from "jsonwebtoken";
import { CookieType } from "../../types/cookie";
// query param
// check amount of custom problems left
// let user do the problem, no points given
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
}
