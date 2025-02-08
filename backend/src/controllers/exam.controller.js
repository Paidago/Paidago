import { AI_API_KEY, config, data } from '../config.js'
import Activity from '../models/activity.model.js'
import Exam from '../models/exam.model.js'
import axios from 'axios'

// Función para interactuar con la API de OpenAI y generar el examen
const generateExamFromAI = async (subject, especifications, activities) => {
    try {
        const prompt = `
        Eres una experta en pedagogía y didáctica. Tu tarea es generar un examen sobre ${subject}, asegurando que todas las preguntas cumplan con las siguientes especificaciones: ${especifications}.
        
        📌 **Instrucciones clave**:  
        - **Formato obligatorio** para cada pregunta:
          1. Número de la pregunta) Texto de la pregunta.
          2. Opciones de respuesta: **Deben estar en un arreglo y separadas por '--' (NO por comas ',')**.
          3. La respuesta correcta debe indicarse después con el formato exacto: **Respuesta correcta: [Respuesta correcta]**.
        
        📌 **Fuente del examen**:  
        El examen debe basarse exclusivamente en la siguiente información:  
        "${activities.map(activity => activity.generatedClass).join('. ')}"  
        
        ⚠️ **Reglas estrictas**:  
        - Solo genera **preguntas de acuerdo a las especificaciones**.
        - Genera exactamente el numero de preguntas que se te piden y **Debes estar atenta cuantas te piden de seleccion multiple y cuantas abiertas**  
        - Respeta **estrictamente** el formato proporcionado.  
        - **No agregues texto adicional** como "Aquí está tu examen" o "Preguntas generadas". Solo responde con las preguntas estructuradas según las reglas indicadas.  
        
        Ejemplo de formato correcto:  
        Para seleccion multiple:
        1) ¿Cuál es la capital de Francia?  
        [París--Londres--Berlín--Madrid]  
        Respuesta correcta: [París]  
        
        2) ¿Cuál es el resultado de 2 + 2?  
        [3--4--5--6]  
        Respuesta correcta: [4]  
        
        Para abiertas:
        3) ¿Cuál es la fórmula del agua?
        []
        Respuesta correcta: [H2O]
        Genera el examen respetando este mismo formato y sin añadir información extra.  
        `;
        

        // Realiza la solicitud a la API de OpenAI
        const response = await axios.post('https://api.openai.com/v1/completions', {...data, prompt}, config);
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
        const options = parts[1]?.replace('[','').replace(']','').split('--').map(item => item.trim()).filter(item => item !== ''); // Extrae las opciones
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
