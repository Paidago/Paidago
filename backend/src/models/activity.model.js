import mongoose from 'mongoose'

const sectionSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    text: { type: String, required: true, trim: true }
})

const activitySchema = new mongoose.Schema({
    methodology: { type: String, required: true},
    topic: { type: String, required: true, trim: true},
    tools: { type: String, trim: true},
    competence: { type: String, required: true, trim: true},
    subject:{ type: String, required: true},
    sections: { type: [sectionSchema], required: true},
    generatedClass:{ type: String, required: true, trim: true},
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
})

export default mongoose.model('Activity', activitySchema)