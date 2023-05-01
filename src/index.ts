import express, { Express, Request, Response } from "express";
const cors = require("cors");
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const port = 80;

app.use(cors());
app.use(express.json());

app.post("/javascript", (req: Request, res: Response) => {
  console.log(req.body);
  res.status(200).send("status OK");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
