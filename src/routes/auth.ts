import express from "express";
import Login from "../controllers/auth/login";
import Register from "../controllers/auth/register";
import logout from "../controllers/auth/logout";

const authRouter = express.Router();

authRouter.post("/register", Register);
authRouter.post("/login", Login);
authRouter.get("/logout", logout);

export default authRouter;
