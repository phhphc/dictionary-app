import { Schema } from 'mongoose'

export interface IDictPron {
    pron: string
    audio: {
        type: string
        src: string
    }[]
}

export interface IDictDetail {
    word: string
    pos: string[]
    uk?: IDictPron
    us?: IDictPron
    senses: {
        def: string
        examples: string[]
    }[]
}

export interface IDict {
    word: string
    mean?: string
    detail: IDictDetail[]
    owner: Schema.Types.ObjectId
    hideUntil?: Date
}
