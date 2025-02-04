import { AI_API_KEY } from '../config.js'
import Activity from '../models/activity.model.js'
import Exam from '../models/exam.model.js'
import axios from 'axios'

// Función para interactuar con la API de OpenAI y generar el examen
const generateExamFromAI = async (subject, especifications, activities) => {
    try {
        const prompt = `
        Conviertete en una experta en pedagogia y didactica para crear un examen sobre ${subject} de forma acertiva y precisa con las siguientes especificaciones: ${especifications}.
        El examen debe ser basado en la siguiente informacion: ${activities.map(activity => activity.generatedClass).join(', ')}
        Genera un conjunto de preguntas estructuradas de acuerdo al siguiente formato:

        numero de la pregunta) Texto de la pregunta
        [Opción 1, Opción 2, Opción 3, ...] (es importante que las opciones estén juntas en un arreglo y separadas por "--")
        Respuesta correcta: [Respuesta correcta] y "\n" para separar las preguntas.

        Cada pregunta debe estar claramente separada, solo dame las preguntas, no agregues nada como "Examen generado" o "Aqui estan tus preguntas". 
        `;

        const data = {
            model: 'gpt-3.5-turbo-instruct',
            prompt,
            max_tokens: 800, // Ajusta según sea necesario
        };

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${AI_API_KEY}`,
            }
        };

        // Realiza la solicitud a la API de OpenAI
        const response = await axios.post('https://api.openai.com/v1/completions', data, config);
        return response.data.choices[0].text;
    } catch (error) {
        throw new Error('Error al generar el examen desde la API: ' + error.message);
    }
};

// Función para transformar el texto generado en preguntas estructuradas
const parseExamQuestions = (examText) => {
    const examQuestions = []
    const questions = examText.trim().split('\n\n')// Divide por número de pregunta
    questions.forEach(q => {
        const parts = q.split("\n").filter(item => item !== ''); // Divide la pregunta y las opciones
        const text = parts[0].trim(); // Extrae la pregunta
        const options = parts[1]?.replace('[','').replace(']','').split('--').map(item => item.trim()); // Extrae las opciones
        const correctAnswer = parts[2];
    
        examQuestions.push({
            text,
            type: options? 'multiple-choice' : 'open-ended',
            options,
            correctAnswer,
        });
    })
    
    return examQuestions;
};

// Controlador para obtener los exámenes del usuario
export const getExams = async (req, res) => {
    try {
        const exams = await Exam.find({ user: req.userId });
        return res.status(200).json(exams);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Controlador para crear un examen basado en el asunto
export const createExamBySubject = async (req, res) => {
    try {
        const { subject, especifications } = req.body;

        // Obtener las actividades relacionadas con el asunto
        const activities = await Activity.find({ subject });
        if (!activities || activities.length === 0) {
            return res.status(404).json({ message: `No se encontraron actividades para el asunto ${subject}` });
        }

        // Generar el examen utilizando la API de OpenAI
        const examText = await generateExamFromAI(subject, especifications, activities);

        // Parsear el texto del examen para obtener las preguntas estructuradas
        const questions = parseExamQuestions(examText);

        // Crear el examen en la base de datos
        const examCreated = new Exam({
            subject,
            especifications,
            questions,
            user: req.userId,
            text: examText
        });

        await examCreated.save();
        return res.status(200).json(examCreated); // Devolver el examen creado
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
