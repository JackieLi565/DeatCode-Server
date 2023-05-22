import { Request, Response, NextFunction } from "express";
import ref from "../config/MongoConfig";
import { ObjectId } from "mongodb";
import { verifyJWT } from "../helper/token";
import { currentTime } from "../helper/currentDay";

export default async function Refresh(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { cookies } = req;
  const jwt = verifyJWT(cookies.DeatCode_Auth);
  const collection = await ref("users");

  try {
    const doc = await collection.findOne({ _id: new ObjectId(jwt.id) });
    const latestCompletion = doc?.codeProfile.latestCompletion;
    if (latestCompletion === 0) {
      //check if its a new person
      console.log("new user");
      next();
    } else if (latestCompletion - currentTime() > 24 * 60 * 60 * 1000) {
      // person coming back
      console.log("coming back");
      next();
    } else {
      // already did problem today
      console.log("already completed");
      res.status(400).json({ msg: "Today's problem solved" });
      return;
    }
  } catch {
    res.status(401).json({ msg: "No cookie found" });
    return;
  }
}
