import express from "express";
import Login from "../controllers/auth/login";
import Register from "../controllers/auth/register";

const authRouter = express.Router();

authRouter.get("/register", Register);
authRouter.post("/login", Login);

//router.post("logout", )

export default authRouter;
