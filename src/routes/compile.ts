import express from "express";
import PythonScript from "../controllers/python";
const complieRouter = express.Router();

complieRouter.post("/python", PythonScript);
