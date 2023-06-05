import express from "express";
import jwtAuth from "../middlewares/JwtAuth";
import Profile from "../controllers/profile";
const userRouter = express.Router();

userRouter.get("/profileDetails", jwtAuth, Profile);

export default userRouter;
