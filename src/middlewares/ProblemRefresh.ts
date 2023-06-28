import { Request, Response, NextFunction } from "express";
import ref from "../config/MongoConfig";
import { ObjectId } from "mongodb";
import { verifyJWT } from "../helper/token";
import { currentTime } from "../helper/dates";

export default async function Refresh(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { cookies } = req;

  try {
    const jwt = verifyJWT(cookies.DeatCode_Auth);
    const collection = await ref("users");

    const doc = await collection.findOne({ _id: new ObjectId(jwt.id) });
    const latestCompletion = doc?.codeProfile.latestCompletion;

    if (latestCompletion === 0) {
      console.log("new user");
      next();
    } else if (currentTime() - latestCompletion > 24 * 60 * 60 * 1000) {
      console.log("coming back");
      next();
    } else {
      console.log("already completed");
      throw new Error("");
    }
  } catch (e: any) {
    res.status(401).json({ data: e.message });
  }
}
