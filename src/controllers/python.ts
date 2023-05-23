import { Request, Response } from "express";
import fs from "fs";
import { PythonShell } from "python-shell";
import ref from "../config/MongoConfig";
import { ObjectId } from "mongodb";
import { verifyJWT } from "../helper/token";
import { currentTime } from "../helper/dates";

export default async function PythonScript(req: Request, res: Response) {
  const collection = await ref("users");
  const { body, cookies } = req;

  fs.writeFileSync(`./client_data/${body.problem}/result.py`, body.code); //creates python file

  try {
    const pythonScript = await PythonShell.run(
      `./client_data/${body.problem}/driver.py`,
      {
        mode: "text",
        pythonOptions: ["-u"], // get print results in real-time
        args: [""],
      }
    );

    for (let i = 0; i < pythonScript.length; i++) {
      if (pythonScript[i] === "False") {
        console.log("error");
      }
    }

    const cookie = verifyJWT(cookies.DeatCode_Auth);

    await collection.updateOne(
      { _id: new ObjectId(cookie.id) },
      {
        $push: { "codeProfile.completedProblems": body.problemID },
        $set: { "codeProfile.latestCompletion": currentTime() },
        $inc: { "codeProfile.DeatPoints": body.rating },
      }
    );
    res.status(200).json({ status: true });
  } catch (e) {
    res.status(400).json({ status: false, Error: e });
    return;
  }
}
