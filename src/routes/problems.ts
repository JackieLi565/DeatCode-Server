import express from "express";
import jwtAuth from "../middlewares/JwtAuth";
import Refresh from "../middlewares/ProblemRefresh";
import { baseProblems, customProblems } from "../controllers/challanges";

const problemRouter = express.Router();

problemRouter.get("/base", jwtAuth, Refresh, baseProblems);
problemRouter.get("/custom", jwtAuth, Refresh, customProblems);

export default problemRouter;
