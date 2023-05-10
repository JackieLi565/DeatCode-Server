"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function handleJWT(id, latestCompletion) {
    const token = (0, jsonwebtoken_1.sign)({
        exp: Math.floor(Date.now() / 1000) + 7200,
        id,
        latestCompletion,
    }, process.env.JWT_KEY);
    return token;
}
exports.default = handleJWT;
