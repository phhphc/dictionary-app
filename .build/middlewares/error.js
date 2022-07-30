"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const debug = process.env.NODE_ENV === 'DEBUG';
const errorHandler = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }
    res.status(res.statusCode !== 200 ? res.statusCode : 500);
    res.json({
        message: res.statusCode !== 500 ? err.message : 'Internal Server Error',
        stack: debug ? err.stack : null,
    });
};
exports.errorHandler = errorHandler;
