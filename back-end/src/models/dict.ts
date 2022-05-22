import { Schema, model } from "mongoose";

interface IDict {
    word: string,
    mean: string,
    detail: any,
    owner: Schema.Types.ObjectId,
    hideUntil?: Schema.Types.Date
}

const dictSchema = new Schema<IDict>({
    word: {
        type: String,
        required: true
    },
    mean: {
        type: String,
        required: true,
    },
    detail: {
        type: String,
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    hideUntil: {
        type: Schema.Types.Date
    }
}, {
    timestamps: true
})

dictSchema.index({ owner: 1, word: 1 }, { unique: true })

export default model<IDict>('Dict', dictSchema)