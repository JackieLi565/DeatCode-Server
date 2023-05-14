import express from "express";
import Profile from "../controllers/profile/profile_details";
import jwtAuth from "../middlewares/JwtAuth";
const userRouter = express.Router();

userRouter.get("/profileDetails", jwtAuth, Profile);

export default userRouter;
