import { Request, Response } from "express";

export default async function logout(req: Request, res: Response) {
  const { cookies } = req;

  if (!cookies.DeatCode_Auth) {
    res.json({ data: "No auth cookie found" });
    res.redirect("/");
    return;
  }

  res.clearCookie("DeatCode_Auth");
  res.status(200).json({ data: "cookie cleared" });
}
