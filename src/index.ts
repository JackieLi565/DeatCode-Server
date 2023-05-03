import express, { Express, Request, Response } from "express";
import cookieParser from "cookie-parser";
import PythonScript from "./controllers/python";
import dotenv from "dotenv";
import Login from "./controllers/auth/login";
import cors from "cors";
dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(cookieParser());
app.use(cors());
app.use(express.json());

app.post("/api/python", PythonScript);
app.post("/api/login", Login);
app.get("/api/", (req: Request, res: Response) => {
  console.log("hit api");
  res.send("res");
});
app.listen(55714, () => {
  console.log("Listening", "http://localhost:55714/");
});
