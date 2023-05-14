"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const login_1 = __importDefault(require("../controllers/auth/login"));
const register_1 = __importDefault(require("../controllers/auth/register"));
const logout_1 = __importDefault(require("../controllers/auth/logout"));
const authRouter = express_1.default.Router();
authRouter.post("/register", register_1.default);
authRouter.post("/login", login_1.default);
authRouter.get("/logout", logout_1.default);
exports.default = authRouter;
