"use strict";
// Get user
// check last problem
// give random problem
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
// query param
// check amount of custom problems left
// let user do the problem, no points given
function custom_problems(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const collection = (0, MongoConfig_1.default)("challanges");
        const { cookies } = req;
        if (!cookies.DeatCode_Auth) {
            res.send(201).json({ desc: "Error, no cookie", redirectURL: "/login" });
            return;
        }
        const cookie_data = (0, jsonwebtoken_1.verify)(cookies.DeatCode_Auth, process.env.JWT_KEY);
    });
}
exports.default = custom_problems;
