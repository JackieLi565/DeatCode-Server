"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const profile_details_1 = __importDefault(require("../controllers/profile/profile_details"));
const JwtAuth_1 = __importDefault(require("../middlewares/JwtAuth"));
const userRouter = express_1.default.Router();
userRouter.get("/profileDetails", JwtAuth_1.default, profile_details_1.default);
exports.default = userRouter;
