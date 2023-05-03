import { Request, Response } from "express";
import ref from "../../config/MongoConfig";
import { sign } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export default async function Login(req: Request, res: Response) {
  const collection = await ref("users");
  const { username, password } = req.body;
  const data = await collection.findOne({ username, password });
  if (!data) {
    res.status(201).json({ data: "No user found" });
    return;
  }

  res.cookie("DeatCode_Auth", handleJWT(data.username), {
    httpOnly: true,
  });

  res.status(200).json({ data: "userfound" });
}

function handleJWT(username: string) {
  const token = sign(
    {
      exp: Math.floor(Date.now() / 1000) + 7200, //2 hours
      username: username,
    },
    process.env.JWT_KEY as string
  );

  return token;
}
