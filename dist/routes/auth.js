"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const login_1 = __importDefault(require("../controllers/auth/login"));
const register_1 = __importDefault(require("../controllers/auth/register"));
const authRouter = express_1.default.Router();
authRouter.get("/register", register_1.default);
authRouter.post("/login", login_1.default);
//router.post("logout", )
exports.default = authRouter;
