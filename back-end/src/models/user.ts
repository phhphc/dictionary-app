import { Schema, model } from 'mongoose'

interface IUser {
    email: string
    password: string
    name: string
}

const userSchema = new Schema<IUser>(
    {
        email: {
            type: String,
            unique: true,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
)

export default model<IUser>('User', userSchema)
