import { Request, Response } from "express";
import ref from "../../config/MongoConfig";
import { ObjectId } from "mongodb";
import { verify } from "jsonwebtoken";
import dotenv from "dotenv";
import { CookieType } from "../../types/cookie";
dotenv.config();

export default async function Profile(req: Request, res: Response) {
  const collection = await ref("users");
  const { cookies } = req;

  const data = verify(
    cookies.DeatCode_Auth,
    process.env.JWT_KEY as any
  ) as CookieType;

  const doc = await collection.findOne({ _id: new ObjectId(data.id) });

  res.json({
    profileDetails: doc?.userProfile,
    codeDetails: doc?.codeProfile,
  });
}
