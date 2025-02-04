import mongoose from 'mongoose'

const questionSchema = new mongoose.Schema({
    text: { type: String, required: true, trim: true },
    type: { type: String, enum: ['multiple-choice', 'open-ended'], required: true },
    options: { type: [String], default: [] }, // Solo si es opción múltiple
    correctAnswer: { type: String, trim: true } // Para evaluar respuestas
});

const examSchema = new mongoose.Schema(
    {
        subject: { type: String, required: true, trim: true },
        especifications: { type: String, required: true, trim: true },
        questions: { type: [questionSchema], required: true }, // Lista de preguntas
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        text: { type: String, required: true, trim: true } // Texto del examen generado
    },
    { timestamps: true }
);

export default mongoose.model('Exam', examSchema)