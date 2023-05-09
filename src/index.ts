import express, { Express } from "express";
import cookieParser from "cookie-parser";
import PythonScript from "./controllers/python";
import dotenv from "dotenv";
import cors from "cors";
import authRouter from "./routes/auth";

dotenv.config();

const app: Express = express();
const port = process.env.PORT as string;

app.use(cookieParser());
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.post("/api/python", PythonScript);

app.listen(port, () => {
  console.log("Server we UP");
});
