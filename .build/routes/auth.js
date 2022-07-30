"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../controllers/auth");
const authRouter = (0, express_1.Router)();
authRouter.post('/login', auth_1.login);
authRouter.post('/register', auth_1.register);
authRouter.post('/logout', auth_1.logout);
exports.default = authRouter;
