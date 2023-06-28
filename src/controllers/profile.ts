import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import ref from "../config/MongoConfig";
import { verifyJWT } from "../helper/token";
import { Cookies } from "../types/cookie";

export async function Profile(req: Request, res: Response) {
  const collection = await ref("users");
  const { cookies }: { cookies: Partial<Cookies> } = req;

  try {
    if (!cookies.DeatCode_Auth) throw new Error("No cookie found");
    const data = verifyJWT(cookies.DeatCode_Auth);

    const doc = await collection.findOne({ _id: new ObjectId(data.id) });

    res.json({
      profileDetails: doc?.userProfile,
      codeDetails: doc?.codeProfile,
    });
  } catch (e: any) {
    res.status(400).json({ data: e.message });
  }
}

export async function UpdateProfile(req: Request, res: Response) {
  const {
    cookies,
    body,
  }: {
    cookies: Partial<Cookies>;
    body: { username: string; bio: string };
  } = req;

  try {
    if (!cookies.DeatCode_Auth) throw new Error("No cookie found");

    const cookie = verifyJWT(cookies.DeatCode_Auth);
    const collection = await ref("users");

    const doc = { _id: new ObjectId(cookie.id) };

    if (!doc) throw new Error("No user found");
    await collection.updateOne(doc, {
      $set: {
        "userProfile.username": body.username,
        "userProfile.desc": body.bio,
      },
    });
    res.status(200).json({ data: "update success" });
  } catch (e: any) {
    console.log(e.message);
    res.status(400).json({ data: e.message });
  }
}
