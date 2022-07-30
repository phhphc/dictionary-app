"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.lookUpWord = exports.autoCompleteWord = exports.deleteUserDict = exports.updateUserDict = exports.addUserDict = exports.getUserDict = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const dict_1 = __importDefault(require("../models/dict"));
const cambridge = __importStar(require("../services/cambridge"));
// @desc    Get all user dict
// @route   GET /api/dict/
// @access  Authenticate only
exports.getUserDict = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const dictList = yield dict_1.default.find({ owner: (_a = req.auth) === null || _a === void 0 ? void 0 : _a.id }).select('word mean detail hideUntil');
    res.json(dictList);
}));
// @desc    Add dict to user dict list
// @route   POST /api/dict
// @access  Authenticate only
exports.addUserDict = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const { word, mean, detail, hideUntil } = req.body;
    if (!word || mean == null || !detail) {
        res.status(400);
        throw new Error('Missing required fields');
    }
    const dict = yield dict_1.default.create({
        word,
        mean,
        detail,
        owner: (_b = req.auth) === null || _b === void 0 ? void 0 : _b.id,
        hideUntil,
    }).catch((e) => {
        res.status(409);
        throw new Error('Word already exists');
    });
    res.status(201).json({
        _id: dict._id,
        word: dict.word,
        mean: dict.mean,
        detail: dict.detail,
        hideUntil: dict.hideUntil,
    });
}));
// @desc    Update user dict
// @route   PUT /api/dict/:id
// @access  Authenticate only
exports.updateUserDict = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const { word, mean, detail, hideUntil } = req.body;
    console.log(req.body);
    const dict = yield dict_1.default.findOneAndUpdate({ _id: req.params.id, owner: (_c = req.auth) === null || _c === void 0 ? void 0 : _c.id }, { word, mean, detail, hideUntil }, { new: true })
        .select('word mean detail hideUntil')
        .catch(() => {
        res.status(409);
        throw new Error('Word duplicate');
    });
    if (dict) {
        res.status(200).json(dict);
    }
    else {
        res.status(404);
        throw new Error('Dict not found');
    }
}));
// @desc    Delete user dict
// @route   DELETE /api/dict/:id
// @access  Authenticate only
exports.deleteUserDict = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    const { deletedCount } = yield dict_1.default.deleteOne({
        _id: req.params.id,
        owner: (_d = req.auth) === null || _d === void 0 ? void 0 : _d.id,
    });
    if (deletedCount) {
        res.status(202).json({ id: req.params.id });
    }
    else {
        res.status(404);
        throw new Error('Dict not found');
    }
}));
// @desc    Autocomple search word
// @route   GET /api/dict/autocomplete?q=
// @access  Authenticate only
exports.autoCompleteWord = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const q = req.query.q;
    if (q === undefined) {
        res.status(400);
        throw new Error('Missing required fields');
    }
    else if (typeof q !== 'string') {
        res.status(400);
        throw new Error('Invalid query');
    }
    const data = yield cambridge.autoCompleteEngWord(q);
    res.send(data);
}));
// @desc    Lookup word
// @route   GET /api/dict/lookup?q=
// @access  Authenticate only
exports.lookUpWord = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const q = req.query.q;
    if (q === undefined) {
        res.status(400);
        throw new Error('Missing required fields');
    }
    else if (typeof q !== 'string') {
        res.status(400);
        throw new Error('Invalid query');
    }
    const data = yield cambridge.lookUpWord(q);
    const resData = {
        word: q,
        mean: '',
        detail: data,
    };
    res.send(resData);
}));
