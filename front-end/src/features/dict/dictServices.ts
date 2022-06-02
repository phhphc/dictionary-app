import axios from 'axios'

import { IDict, IDictUnsaved } from 'app/interfaces'

export const loadDict = async () => {
    const response = await axios.get('/api/dict')
        .catch((err) => { throw err.response.data.message || (err.message as string) })

    return response.data as IDict[]
}


export interface IAutoComplete {
    word: string,
    url: string,
    beta: boolean,
}
export const autoComplete = async (word: string) => {
    if (!word) { return [] }

    const response = await axios.get('/api/dict/autocomplete', { params: { q: word } })
        .catch((err) => { throw err.response.data.message || (err.message as string) })

    return response.data as IAutoComplete[]
}


export const lookUpDict = async (word: string) => {
    const response = await axios.get('/api/dict/lookup', { params: { q: word } })
        .catch((err) => { throw err.response.data.message || (err.message as string) })

    return response.data as IDict
}


export const addDict = async (dict: IDict | IDictUnsaved) => {
    const response = await axios.post('/api/dict', dict)
        .catch((err) => { throw err.response.data.message || (err.message as string) })

    return response.data as IDict
}


export const deleteDict = async (id: string) => {
    const response = await axios.delete(`/api/dict/${id}`)
        .catch((err) => { throw err.response.data.message || (err.message as string) })

    return response.data as { id: string }
}