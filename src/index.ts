import fs from "fs";
import { PythonShell } from "python-shell";
import Connect from "./config/MongoConfig";
import express, { Express, Request, Response } from "express";

const cors = require("cors"); // rando import

import dotenv from "dotenv";
dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

app.post("/javascript", async (req: Request, res: Response) => {
  fs.writeFileSync("./client_data/result.py", req.body.code); //creates python file

  //TODO
  //query for code driver
  //create py file
  //query for arg driver

  Connect("users");

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
});

let server = app.listen(0, () => {
  console.log("Listening", server.address());
});
