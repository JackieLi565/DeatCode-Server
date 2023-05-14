"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const JwtAuth_1 = __importDefault(require("../middlewares/JwtAuth"));
const ProblemRefresh_1 = __importDefault(require("../middlewares/ProblemRefresh"));
const base_problems_1 = __importDefault(require("../controllers/challanges/base_problems"));
const custom_problems_1 = __importDefault(require("../controllers/challanges/custom_problems"));
const problemRouter = express_1.default.Router();
problemRouter.get("/base", JwtAuth_1.default, ProblemRefresh_1.default, base_problems_1.default);
problemRouter.get("/custom", JwtAuth_1.default, ProblemRefresh_1.default, custom_problems_1.default);
