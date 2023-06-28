import { Request, Response } from "express";
import ref from "../config/MongoConfig";
import { currentDate } from "../helper/dates";
import handleJWT from "../helper/token";
import { UserDocumentType } from "../types/user";

export async function login(req: Request, res: Response) {
  const { method, body } = req;
  const { email, password } = body;

  try {
    if (method !== "POST") throw new Error("Incorrect HTTP Request");

    const collection = await ref("users");

    const data = await collection.findOne({
      "cred.email": email,
      "cred.password": password,
    });

    if (!data) throw new Error("No user found");
    const loggedDays = data.userProfile.loggedDays;
    if (loggedDays[loggedDays.length - 1] !== currentDate()) {
      await collection.updateOne(data, {
        $push: { "userProfile.loggedDays": currentDate() },
      });
    }

    res.cookie("DeatCode_Auth", handleJWT(data._id.toString()), {
      httpOnly: true,
    });

    res.status(200).json({ data: "login OK" });
  } catch (e: any) {
    res.status(400).json({ data: e.message });
  }
}

export async function logout(req: Request, res: Response) {
  const { cookies } = req;
  try {
    if (!cookies.DeatCode_Auth) throw new Error("No cookie found");
    res
      .status(200)
      .clearCookie("DeatCode_Auth")
      .json({ data: "cookie cleared" });
  } catch (e: any) {
    res.status(400).json({ data: e.message });
  }
}

export async function register(req: Request, res: Response) {
  const { email, username, password } = req.body;

  try {
    const collection = await ref("users");

    const data = await collection.findOne({
      "cred.email": email,
    });

    if (data) throw new Error("User already exists");

    const userDoc = CreateDoc({ email, username, password });

    await collection.insertOne(userDoc);

    res.status(200).json({ data: "user created" });
  } catch (e: any) {
    res.status(400).json({ data: e.message });
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
      streak: 0,
      desc: "no bio yet",
      loggedDays: [currentDate()],
    },
    codeProfile: {
      DeatPoints: 0,
      latestCompletion: 0,
      codePublish: [{}],
      completedProblems: [],
    },
    cred: {
      email,
      password,
    },
  };
};
