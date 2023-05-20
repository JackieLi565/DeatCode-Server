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
const currentDay_1 = __importDefault(require("../helper/currentDay"));
const jsonwebtoken_1 = require("jsonwebtoken");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function Refresh(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const cookie = req.cookies.DeatCode_Auth;
        try {
            const data = (0, jsonwebtoken_1.verify)(cookie, process.env.JWT_KEY);
            const since_last_solved = (0, currentDay_1.default)(true) - data.latestCompletion;
            if (data.latestCompletion === 0) {
                //check if its a new person
                next();
            }
            else if (since_last_solved > 24 * 60 * 60 * 1000) {
                // person coming back
                next();
            }
            else {
                // already did problem today
                res
                    .status(200)
                    .json({ desc: "Today's problem solved", redirectURL: false });
                return;
            }
        }
        catch (_a) {
            res.json({ desc: "No cookie found", redirectURL: "/Login" });
            return;
        }
    });
}
exports.default = Refresh;
function setProblem() {
    // set the user current problem
    /*
      * Grab user and check if they have logged in today
      * Yes, dont set a new problem and go next()
      * No, set a new problem
      *
    */
}
