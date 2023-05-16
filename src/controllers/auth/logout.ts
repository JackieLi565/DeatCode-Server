import { Request, Response } from "express";

export default async function logout(req: Request, res: Response) {
  const { cookies } = req;
  if (!cookies.DeatCode_Auth) {
    res.json({ desc: "no cookie found", redirectURL: "/Login" });
    return;
  }
  res
    .status(200)
    .clearCookie("DeatCode_Auth")
    .json({ desc: "cookie cleared", redirectURL: "/Login" });
}
