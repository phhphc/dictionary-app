export interface IUser {
    name: string
    email: string
}

export interface ILoginData {
    email: string
    password: string
}

export interface IRegisterData {
    name: string
    email: string
    password: string
}

export interface IWDetail {
    word: string
    pos: string[]
    ipa_uk: string
    ipa_us: string
    senses: {
        def: string
        examples: string[]
    }[]
}

export interface IDict {
    _id: string
    word: string
    mean: string
    detail: IWDetail[]
    hideUntil?: Date
}

export interface IDictUnsaved extends Omit<IDict, '_id'> {
    _id: null | string
}
