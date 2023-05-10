"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MongoConfig_1 = __importDefault(require("../../config/MongoConfig"));
const jsonwebtoken_1 = require("jsonwebtoken");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function Login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const collection = yield (0, MongoConfig_1.default)("users");
        const { username, password } = req.body;
        const data = yield collection.findOne({ username, password });
        if (!data) {
            res.status(201).json({ data: "No user found" });
            return;
        }
        res.cookie("DeatCode_Auth", handleJWT(data.username), {
            httpOnly: true,
        });
        res.status(200).json({ desc: "login", redirectURL: "/Home" });
    });
}
exports.default = Login;
function handleJWT(username) {
    const token = (0, jsonwebtoken_1.sign)({
        exp: Math.floor(Date.now() / 1000) + 7200,
        username: username,
    }, process.env.JWT_KEY);
    return token;
}
