import { Schema, model } from 'mongoose'

interface IDict {
    word: string
    mean?: string
    detail: {
        word: string;
        ipa_uk: string;
        ipa_us: string;
        senses: {
            def: string;
            examples: string[];
        }[]
    }[]
    owner: Schema.Types.ObjectId
    hideUntil?: Schema.Types.Date
}

const dictSchema = new Schema<IDict>(
    {
        word: {
            type: String,
            required: true,
        },
        mean: {
            type: String
        },
        detail: {
            type: Schema.Types.Array,
            required: true,
        },
        owner: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        hideUntil: {
            type: Schema.Types.Date,
        },
    },
    {
        timestamps: true,
    }
)

dictSchema.index({ owner: 1, word: 1 }, { unique: true })

export default model<IDict>('Dict', dictSchema)
