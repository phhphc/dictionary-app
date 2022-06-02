import { load } from 'cheerio'


function clearRedendentSpaces(text = '') {
    return text.replace(/[\s\n|\t]+/g, ' ');
}

export default function parseSenseHTML(html: string) {
    const $ = load(html);

    return $('.di-body .entry-body__el').map((_, entry) => {
        const $entry = $(entry);
        return {
            word: $entry.find('.di-title').text(),
            pos: $entry.find('.pos.dpos').map((_, pos) => $(pos).text()).get(),
            ipa_uk: $entry.find('.uk .ipa').text(),
            ipa_us: $entry.find('.us .ipa').text(),
            senses: $entry.find('.ddef_block').map((_, sense) => {
                const $sense = $(sense);
                return {
                    def: clearRedendentSpaces($sense.find('.def').text()),
                    examples: $sense.find('.dexamp').map((_, exp) => clearRedendentSpaces($(exp).find('.eg').text())).get()
                }
            }).get()
        }
    }).get()
}

