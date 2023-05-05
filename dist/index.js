"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const python_1 = __importDefault(require("./controllers/python"));
const dotenv_1 = __importDefault(require("dotenv"));
const login_1 = __importDefault(require("./controllers/auth/login"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.post("/api/python", python_1.default);
app.post("/api/login", login_1.default);
app.get("/api/", (req, res) => {
    console.log("hit api");
    res.send("res");
});
app.listen(55714, () => {
    console.log("Listening", "http://localhost:55714/");
});
