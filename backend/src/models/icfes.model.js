import mongoose from "mongoose";

// const questionSchema = new mongoose.Schema({
//     statement: { type: String, required: true }, // Enunciado de la pregunta
//     options: [{ type: String, required: true }], // Opciones de respuesta
//     correctAnswer: { type: String, required: true } // Respuesta correcta
// });

const icfesSchema = new mongoose.Schema({
    subject: { type: String, required: true }, // Asignatura del examen
    competence: { type: String, required: true }, // Competencia evaluada
    paragraph: { type: String, required: true }, // Párrafo base para generar preguntas
    questionCount: { type: Number, required: true, min: 1, max: 3 }, // Cantidad de preguntas
    questions: [], // Lista de preguntas generadas
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Usuario que creó el examen
    createdAt: { type: Date, default: Date.now }
});

const Icfes = mongoose.model("Icfes", icfesSchema);

export default Icfes;
