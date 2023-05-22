import { Request, Response } from "express";
import ref from "../../config/MongoConfig";
import { ObjectId } from "mongodb";
import { verifyJWT } from "../../helper/token";

export default async function Profile(req: Request, res: Response) {
  const collection = await ref("users");
  const { cookies } = req;

  const data = verifyJWT(cookies.DeatCode_Auth);

  const doc = await collection.findOne({ _id: new ObjectId(data.id) });

  res.json({
    profileDetails: doc?.userProfile,
    codeDetails: doc?.codeProfile,
  });
}
