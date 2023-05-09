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
const currentDay_1 = __importDefault(require("../../helper/currentDay"));
function Register(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const collection = yield (0, MongoConfig_1.default)("users");
        if (!req.body.email) {
            res.json({ data: "no args supplied" });
            return;
        }
        const { email, username, password } = req.body;
        const userDoc = {
            email,
            username,
            password,
            desc: "no bio yet",
            streak: 5,
            loggedDays: [(0, currentDay_1.default)()],
            latestCompletion: "",
            DeatPoints: 0,
            codePublish: [],
        };
        try {
            yield collection.insertOne(userDoc);
            res.json({ data: "user created" });
        }
        catch (_a) {
            res.status(300).json({ data: "failed to create user" });
        }
    });
}
exports.default = Register;
