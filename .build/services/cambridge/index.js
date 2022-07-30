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
exports.lookUpWord = exports.autoCompleteEngWord = void 0;
const axios_1 = __importDefault(require("axios"));
const parser_1 = __importDefault(require("./parser"));
const AUTO_COMPLETE_API = 'https://dictionary.cambridge.org/autocomplete/amp';
const autoCompleteEngWord = (word) => __awaiter(void 0, void 0, void 0, function* () {
    const { data } = yield axios_1.default.get(AUTO_COMPLETE_API, {
        params: {
            dataset: 'english',
            q: word,
        },
    });
    return data;
});
exports.autoCompleteEngWord = autoCompleteEngWord;
const LOOKUP_API = 'https://dictionary.cambridge.org/dictionary/english/';
const lookUpWord = (word) => __awaiter(void 0, void 0, void 0, function* () {
    const { data } = yield axios_1.default.get(LOOKUP_API + encodeURIComponent(word));
    return (0, parser_1.default)(data);
});
exports.lookUpWord = lookUpWord;
