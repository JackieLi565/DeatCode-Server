import { Request, Response } from "express";
import ref from "../../config/MongoConfig";
import { currentDate } from "../../helper/dates";
import handleJWT from "../../helper/token";

export default async function Login(req: Request, res: Response) {
  const collection = await ref("users");
  const { email, password } = req.body;

  const data = await collection.findOne({
    "cred.email": email,
    "cred.password": password,
  });

  if (!data) {
    res.status(201).json({ data: "No user found" });
    return;
  }

  const loggedDays = data.userProfile.loggedDays;

  if (loggedDays[loggedDays.length - 1] !== currentDate()) {
    await collection.updateOne(data, {
      $push: { "userProfile.loggedDays": currentDate() },
    });
  }

  res.cookie("DeatCode_Auth", handleJWT(data._id.toString()), {
    httpOnly: true,
  });

  res.status(200).json({ desc: "login", redirectURL: "/Home" });
}
