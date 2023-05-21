import { Request, Response } from "express";
import ref from "../../config/MongoConfig";
import { currentDate } from "../../helper/currentDay";
import { UserDocumentType } from "../../types/user";

export default async function Register(req: Request, res: Response) {
  const collection = await ref("users");

  const { email, username, password } = req.body;

  const data = await collection.findOne({
    "cred.email": email,
  });

  if (data) {
    console.log(data);
    res.status(400).send("user in database");
    return;
  }

  const userDoc = CreateDoc({ email, username, password });

  try {
    await collection.insertOne(userDoc);
    res.status(200).json({ data: "user created", redirectURL: "/Login" });
  } catch {
    res.status(400).json({ data: "failed to create user" });
  }
}

const CreateDoc = ({
  email,
  username,
  password,
}: {
  email: string;
  username: string;
  password: string;
}): UserDocumentType => {
  return {
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
  };
};
