import express from "express";
import jwtAuth from "../middlewares/JwtAuth";
import { Profile, UpdateProfile } from "../controllers/profile";
const userRouter = express.Router();

userRouter.get("/profileDetails", jwtAuth, Profile);
userRouter.put("/edit", jwtAuth, UpdateProfile);

export default userRouter;
