"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const python_1 = __importDefault(require("./controllers/python"));
const dotenv_1 = __importDefault(require("dotenv"));
const login_1 = __importDefault(require("./controllers/auth/login"));
dotenv_1.default.config();
const cors = require("cors");
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use(cors());
app.use(express_1.default.json());
app.post("/python", python_1.default);
app.post("/login", login_1.default);
app.listen(55714, () => {
    console.log("Listening", "https://localhost:55714");
});
