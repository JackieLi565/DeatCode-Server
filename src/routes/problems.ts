import express from "express";
import jwtAuth from "../middlewares/JwtAuth";
import Refresh from "../middlewares/ProblemRefresh";
import baseProblems from "../controllers/challanges/base_problems";
import customProblems from "../controllers/challanges/custom_problems";

const problemRouter = express.Router();

problemRouter.get("/base", jwtAuth, Refresh, baseProblems);
problemRouter.get("/custom", jwtAuth, Refresh, customProblems);
