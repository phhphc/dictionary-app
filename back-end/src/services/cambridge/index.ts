import axios from 'axios'

import parseSenseHTML from './parser'

const AUTO_COMPLETE_API = 'https://dictionary.cambridge.org/autocomplete/amp'
export const autoCompleteEngWord = async (word: string) => {
    const { data } = await axios.get(AUTO_COMPLETE_API, {
        params: {
            dataset: 'english',
            q: word,
        },
    })
    return data
}

const LOOKUP_API = 'https://dictionary.cambridge.org/dictionary/english/'
export const lookUpWord = async (word: string) => {
    const { data } = await axios.get(LOOKUP_API + encodeURIComponent(word))

    return parseSenseHTML(data)
}
