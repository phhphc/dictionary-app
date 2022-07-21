import { Schema, model } from 'mongoose'
import { IDict, IDictPron, IDictDetail } from '../interface/dict'

type IDictSense = IDictDetail['senses'][0]
type IDictPronAudio = IDictPron['audio'][0]

const DictPronSchema = new Schema<IDictPron>({
    pron: {
        type: String,
        required: true
    },
    audio: {
        type: [new Schema<IDictPronAudio>({
            type: {
                type: String,
                required: true
            },
            src: {
                type: String,
                required: true
            }
        })],
        required: true
    }
})

const dictSchema = new Schema<IDict>(
    {
        word: {
            type: String,
            required: true,
        },
        mean: {
            type: String,
        },
        detail: {
            type: [new Schema<IDictDetail>(
                {
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
                        type: [new Schema<IDictSense>({
                            def: String,
                            examples: [String]
                        })],
                        required: true,
                    }
                }
            )],
            required: true
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
