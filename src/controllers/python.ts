import { Request, Response } from "express";
import fs from "fs";
import { PythonShell } from "python-shell";

export default async function PythonScript(req: Request, res: Response) {
  fs.writeFileSync("./client_data/result.py", req.body.code); //creates python file

  //TODO
  //query for code driver
  //create py file
  //query for arg driver

  const options = {
    mode: "text",
    pythonOptions: ["-u"], // get print results in real-time
    args: [1, 2, 3],
  };

  try {
    const pythonScript = await PythonShell.run(
      "./client_data/answer.py",
      options as any
    );
    console.log(pythonScript);
    res.status(200).send("status OK");
  } catch {
    res.status(400).send("status FAIL");
  }
}
