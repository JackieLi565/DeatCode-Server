import fs from "fs";
import { PythonShell } from "python-shell";
import express, { Express, Request, Response } from "express";
const cors = require("cors");
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const port = 80;

app.use(cors());
app.use(express.json());

app.post("/javascript", async (req: Request, res: Response) => {
  fs.writeFileSync("./client_data/test.py", req.body.code);

  const options = {
    mode: "text",
    pythonOptions: ["-u"], // get print results in real-time
    args: [1, 2, 3],
  };

  const pythonScript = await PythonShell.run(
    "./client_data/test.py",
    options as any
  );
  console.log(pythonScript);
  res.status(200).send("status OK");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
