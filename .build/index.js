"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
require("colors");
const error_1 = require("./middlewares/error");
const database_1 = require("./configs/database");
const routes_1 = __importDefault(require("./routes"));
(0, database_1.connectDB)();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`[server] Server is running at http://localhost:${port}`);
    if (process.env.NODE_ENV == 'DEBUG') {
        console.warn(`[server] Server is running in debug mode`.red);
    }
});
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use(routes_1.default);
app.use(express_1.default.static(__dirname + '/../public/'));
app.get('/*', (req, res) => {
    res.sendFile(__dirname + '/../public/index.html');
});
app.use(error_1.errorHandler);
