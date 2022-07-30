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
exports.deleteUser = exports.updateUser = exports.getUser = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const user_1 = __importDefault(require("../models/user"));
const password_1 = require("../helpers/password");
// @desc    Get user data
// @route   GET /api/user/
// @access  Authenticated only
exports.getUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const user = yield user_1.default.findById((_a = req.auth) === null || _a === void 0 ? void 0 : _a.id).select('email name');
    if (user) {
        res.json({
            name: user.name,
            email: user.email,
        });
    }
    else {
        res.status(404);
        throw new Error('User not found');
    }
}));
exports.updateUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const { email, password, name } = req.body;
    // update user data
    const user = yield user_1.default.findByIdAndUpdate((_b = req.auth) === null || _b === void 0 ? void 0 : _b.id, {
        email,
        password: password ? yield (0, password_1.hashPassword)(password) : password,
        name,
    }, { new: true })
        .select('email name')
        .catch(() => {
        res.status(409);
        throw new Error('Email duplicate');
    });
    if (user) {
        res.json({
            name: user.name,
            email: user.email,
        });
    }
    else {
        res.status(404);
        throw new Error('User not found');
    }
}));
// @desc    Delete user account and all related data
// @route   DELETE /api/user/
// @access  Authenticated only
exports.deleteUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const { deletedCount } = yield user_1.default.deleteOne({ _id: (_c = req.auth) === null || _c === void 0 ? void 0 : _c.id });
    if (deletedCount) {
        res.status(204).send();
    }
    else {
        res.status(404);
        throw new Error('User not found');
    }
}));
