import { Schema, model } from "mongoose"

interface IUser {
    email: string,
    password: string,
    name: string
}

const userSchema = new Schema<IUser>({
    email: {
        type: String,
        unique: true,
        required: [true, 'No username']
    },
    password: {
        type: String,
        required: [true, 'No password']
    },
    name: {
        type: String,
        required: [true, 'No name']
    }
}, {
    timestamps: true
})

export default model<IUser>('User', userSchema)