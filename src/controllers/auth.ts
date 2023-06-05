import { Request, Response } from "express";
import ref from "../config/MongoConfig";
import { currentDate } from "../helper/dates";
import handleJWT from "../helper/token";
import { UserDocumentType } from "../types/user";

export async function login(req: Request, res: Response) {
  const collection = await ref("users");
  const { email, password } = req.body;

  const data = await collection.findOne({
    "cred.email": email,
    "cred.password": password,
  });

  if (!data) {
    res.status(201).json({ data: "No user found" });
    return;
  }

  const loggedDays = data.userProfile.loggedDays;

  if (loggedDays[loggedDays.length - 1] !== currentDate()) {
    await collection.updateOne(data, {
      $push: { "userProfile.loggedDays": currentDate() },
    });
  }

  res.cookie("DeatCode_Auth", handleJWT(data._id.toString()), {
    httpOnly: true,
  });

  res.status(200).json({ desc: "login", redirectURL: "/Home" });
}

export async function logout(req: Request, res: Response) {
  const { cookies } = req;
  if (!cookies.DeatCode_Auth) {
    res.json({ desc: "no cookie found", redirectURL: "/Login" });
    return;
  }
  res
    .status(200)
    .clearCookie("DeatCode_Auth")
    .json({ desc: "cookie cleared", redirectURL: "/Login" });
}

export async function register(req: Request, res: Response) {
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
      completedProblems: [],
    },
    cred: {
      email,
      password,
    },
  };
};
