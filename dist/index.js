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
const fs_1 = __importDefault(require("fs"));
const python_shell_1 = require("python-shell");
const MongoConfig_1 = __importDefault(require("./config/MongoConfig"));
const express_1 = __importDefault(require("express"));
const cors = require("cors"); // rando import
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use(cors());
app.use(express_1.default.json());
app.post("/javascript", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    fs_1.default.writeFileSync("./client_data/result.py", req.body.code); //creates python file
    //TODO
    //query for code driver
    //create py file
    //query for arg driver
    (0, MongoConfig_1.default)("users");
    const options = {
        mode: "text",
        pythonOptions: ["-u"],
        args: [1, 2, 3],
    };
    try {
        const pythonScript = yield python_shell_1.PythonShell.run("./client_data/answer.py", options);
        console.log(pythonScript);
        res.status(200).send("status OK");
    }
    catch (_a) {
        res.status(400).send("status FAIL");
    }
}));
let server = app.listen(0, () => {
    console.log("Listening", server.address());
});