"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const DictPronSchema = new mongoose_1.Schema({
    pron: {
        type: String,
        required: true,
    },
    audio: {
        type: [
            new mongoose_1.Schema({
                type: {
                    type: String,
                    required: true,
                },
                src: {
                    type: String,
                    required: true,
                },
            }),
        ],
        required: true,
    },
});
const dictSchema = new mongoose_1.Schema({
    word: {
        type: String,
        required: true,
    },
    mean: {
        type: String,
    },
    detail: {
        type: [
            new mongoose_1.Schema({
                word: String,
                pos: [String],
                uk: {
                    type: DictPronSchema,
                    required: false,
                },
                us: {
                    type: DictPronSchema,
                    required: false,
                },
                senses: {
                    type: [
                        new mongoose_1.Schema({
                            def: String,
                            examples: [String],
                        }),
                    ],
                    required: true,
                },
            }),
        ],
        required: true,
    },
    owner: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    hideUntil: {
        type: mongoose_1.Schema.Types.Date,
    },
}, {
    timestamps: true,
});
dictSchema.index({ owner: 1, word: 1 }, { unique: true });
exports.default = (0, mongoose_1.model)('Dict', dictSchema);
