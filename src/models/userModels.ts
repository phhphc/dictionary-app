import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
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

export default mongoose.model('User', userSchema)