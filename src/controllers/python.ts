import { Request, Response } from "express";
import fs from "fs";
import { PythonShell } from "python-shell";
import ref from "../config/MongoConfig";

export default async function PythonScript(req: Request, res: Response) {
  const collection = ref("users");
  const { body } = req;
  fs.writeFileSync(`./client_data/${body.problem}/result.py`, body.code); //creates python file

  try {
    const pythonScript = await PythonShell.run(
      `./client_data/${body.problem}/driver.py`,
      {
        mode: "text",
        pythonOptions: ["-u"], // get print results in real-time
      }
    );
    for (let i = 0; i < pythonScript.length; i++) {
      if (pythonScript[i] === "False") throw new Error();
    }
  } catch (e) {
    console.log(e);
    res.status(400).send("Incorrect Solution");
  }

  // update profile
  // send correct msg
}
