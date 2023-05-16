import { Request, Response } from "express";
import ref from "../../config/MongoConfig";
import currentDate from "../../helper/currentDay";
import { UserDocumentType } from "../../types/user";
/* TODO
 * Check for duplicate users
 */
export default async function Register(req: Request, res: Response) {
  const collection = await ref("users");
  if (!req.body.email) {
    res.json({ data: "no args supplied" });
    return;
  }

  const { email, username, password } = req.body;

  const userDoc = {
    userProfile: {
      username,
      streak: 5,
      desc: "no bio yet",
      loggedDays: [currentDate()],
    },
    codeProfile: {
      DeatPoints: 0,
      latestCompletion: 0,
      codePublish: [{}],
    },
    cred: {
      email,
      password,
    },
  } as UserDocumentType;

  try {
    await collection.insertOne(userDoc);
    res.json({ data: "user created", redirectURL: "/Home" });
  } catch {
    res.status(300).json({ data: "failed to create user" });
  }
}
