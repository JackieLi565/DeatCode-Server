"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routeTest_1 = __importDefault(require("../controllers/test/routeTest"));
const testRouter = express_1.default.Router();
testRouter.get("/", routeTest_1.default);
//router.post("logout", )
exports.default = testRouter;
