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
exports.logout = exports.register = exports.login = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const user_1 = __importDefault(require("../models/user"));
const password_1 = require("../helpers/password");
const token_1 = require("../helpers/token");
// cookie config
const cookieOption = {
    httpOnly: true,
    sameSite: true,
};
const cookieKey = 'token';
exports.login = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error('Make sure email, password field is included');
    }
    // Check if username and password math
    const user = yield user_1.default.findOne({ email });
    if (!user || !(yield (0, password_1.comparePassword)(password, user.password))) {
        res.status(401);
        throw new Error('User name or password incorrect');
    }
    res.status(204)
        .cookie(cookieKey, (0, token_1.generateToken)({ id: user._id.toString() }), cookieOption)
        .send();
}));
exports.register = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
        res.status(400);
        throw new Error('Make sure email, password, name field is included');
    }
    // Check user exists
    if (yield user_1.default.findOne({ email })) {
        res.status(409);
        throw new Error('Email already exists');
    }
    // Create User
    const user = yield user_1.default.create({
        email,
        password: yield (0, password_1.hashPassword)(password),
        name,
    });
    res.status(200)
        .cookie(cookieKey, (0, token_1.generateToken)({ id: user._id.toString() }), cookieOption)
        .send();
}));
// @desc    User logout
// @route   POST /api/user/logout
// @access  Public
exports.logout = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(204).clearCookie(cookieKey, cookieOption).send();
}));
