import { Request, Response } from "express";
import ref from "../../config/MongoConfig";
import currentDate from "../../helper/currentDay";

export default async function Register(req: Request, res: Response) {
  const collection = await ref("users");
  if (!req.body.email) {
    res.json({ data: "no args supplied" });
    return;
  }

  const { email, username, password } = req.body;
  const userDoc = {
    email,
    username,
    password,
    desc: "no bio yet",
    streak: 5,
    loggedDays: [currentDate()],
    latestCompletion: "",
    DeatPoints: 0,
    codePublish: [],
  };

  try {
    await collection.insertOne(userDoc);
    res.json({ data: "user created" });
  } catch {
    res.status(300).json({ data: "failed to create user" });
  }
}
