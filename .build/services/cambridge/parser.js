"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cheerio_1 = require("cheerio");
const clearRedundantSpaces = (text = '') => {
    return text.replace(/[\s\n|\t]+/g, ' ');
};
const prononSourcePrefix = 'https://dictionary.cambridge.org';
const parsePronon = ($, $lang) => {
    if ($lang.length === 0)
        return undefined;
    return {
        pron: $lang.find('.ipa').text(),
        audio: $lang
            .find('source')
            .map((_, src) => {
            const $src = $(src);
            return {
                type: $src.attr('type'),
                src: prononSourcePrefix + $src.attr('src'),
            };
        })
            .get(),
    };
};
function parseSenseHTML(html) {
    const $ = (0, cheerio_1.load)(html);
    return $('.di-body .entry-body__el')
        .map((_, entry) => {
        const $entry = $(entry);
        const $uk = $($entry.find('.uk'));
        const $us = $($entry.find('.us'));
        return {
            word: $entry.find('.di-title').text(),
            pos: $entry
                .find('.pos.dpos')
                .map((_, pos) => $(pos).text())
                .get(),
            uk: parsePronon($, $uk),
            us: parsePronon($, $us),
            senses: $entry
                .find('.ddef_block')
                .map((_, sense) => {
                const $sense = $(sense);
                return {
                    def: clearRedundantSpaces($sense.find('.def').text()),
                    examples: $sense
                        .find('.dexamp')
                        .map((_, exp) => clearRedundantSpaces($(exp).find('.eg').text()))
                        .get(),
                };
            })
                .get(),
        };
    })
        .get();
}
exports.default = parseSenseHTML;
