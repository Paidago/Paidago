import mongoose from 'mongoose'

const examSchema = new mongoose.Schema({
    subject: {
        type: String,
        required: true,
    },
    especifications: {
        type: String,
        required: true,
        trim: true
    },
    exam:{
        type: String,
        required: true,
        trim: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
})

export default mongoose.model('Exam', examSchema)