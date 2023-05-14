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
const mongodb_1 = require("mongodb");
const jsonwebtoken_1 = require("jsonwebtoken");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function Profile(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const collection = yield (0, MongoConfig_1.default)("users");
        const { cookies } = req;
        const data = (0, jsonwebtoken_1.verify)(cookies.DeatCode_Auth, process.env.JWT_KEY);
        const doc = yield collection.findOne({ _id: new mongodb_1.ObjectId(data.id) });
        res.json({
            desc: "ok",
            data: {
                profileDetails: doc === null || doc === void 0 ? void 0 : doc.userProfile,
                codeDetails: doc === null || doc === void 0 ? void 0 : doc.codeProfile,
            },
        });
    });
}
exports.default = Profile;
