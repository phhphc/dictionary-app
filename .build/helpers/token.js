"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;
const generateToken = (payload) => {
    return (0, jsonwebtoken_1.sign)(payload, jwtSecret, {
        algorithm: 'HS256',
        expiresIn: '30d',
    });
};
exports.generateToken = generateToken;
const verifyToken = (token) => {
    return (0, jsonwebtoken_1.verify)(token, jwtSecret);
};
exports.verifyToken = verifyToken;
