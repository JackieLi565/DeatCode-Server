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
/*
    get all the custom problems
    return a card liek form of information to the user
    * include ID
    * Desc
    * creator
*/
function cards(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const collection = yield (0, MongoConfig_1.default)("custom_problems");
        const problems = yield collection.find({}).toArray(); // all the problems
        const cardForm = problems.map((problem) => {
            return {};
        });
        res.status(200).json({ cardForm });
    });
}
exports.default = cards;
