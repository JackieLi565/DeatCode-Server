"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors = require("cors");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = 80;
app.use(cors());
app.use(express_1.default.json());
app.post("/javascript", (req, res) => {
    console.log(req.body);
    res.status(200).send("status OK");
});
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
