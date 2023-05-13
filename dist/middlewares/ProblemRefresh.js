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
function Refresh(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const cookie = req.cookies.DeatCode_Auth;
        const since_last_solved = (0, currentDay_1.default)(true) - cookie.lastSolved;
        if (since_last_solved > 24 * 60 * 60 * 1000) {
            next();
        }
        res.send(200).json({ desc: "Today's problem solved", problemStatus: false });
    });
}
exports.default = Refresh;
