import { config, data } from '../config.js'
import Activity from '../models/activity.model.js'
import Exam from '../models/exam.model.js'
import axios from 'axios'

// Función para interactuar con la API de OpenAI y generar el examen
const generateExamFromAI = async (subject, especifications, activities) => {
    try {
        const messages = [
            {
              "role": "system",
              "content": "Eres una experta en pedagogía y didáctica. Tu tarea es generar exámenes siguiendo estrictamente las instrucciones dadas por el usuario."
            },
            {
              "role": "user",
              "content": `Genera un examen sobre ${subject} con las siguientes especificaciones: ${especifications}.
              📌 **Formato obligatorio:**  
              Cada pregunta debe seguir esta estructura:  
              1) Texto de la pregunta.  
              2) Opciones en un arreglo separadas por '--' (NO comas).  
              3) Respuesta correcta con el formato exacto: 
              **Respuesta correcta: [opción]**.📌 
              **Fuente:**  Basado únicamente en: "${activities.map(activity => activity.generatedClass).join('. ')}".
              **Reglas:**
              - **Respeta exactamente el número y tipo de preguntas (múltiple opción/abiertas).**  
              - **Sigue el formato al pie de la letra.**  
              - No añadas texto extra como "Aquí está tu examen".
              📌 **Ejemplo de formato:**  
              Para selección múltiple:  
              1) ¿Cuál es la capital de Francia?  
              [París--Londres--Berlín--Madrid]  
              Respuesta correcta: [París]  
              
              Para abiertas:  
              2) ¿Cuál es la fórmula del agua?  
              []  
              Respuesta correcta: [H2O]  
              
              Genera el examen con este mismo formato y sin agregar información adicional.`
            }
          ]

        // Realiza la solicitud a la API de OpenAI
        const response = await axios.post('https://api.openai.com/v1/chat/completions', { ...data, messages }, config);
        // console.log(response.data.choices)
         
        return response.data.choices[0].message.content;
    } catch (error) {
        console.log('Error al generar el examen desde la API: ');
        console.log(error.response.data);
        return error.response.config.data
    }
};

// Función para transformar el texto generado en preguntas estructuradas
const parseExamQuestions = (examText) => {
    const examQuestions = []
    const questions = examText.trim().split('\n\n')// Divide por número de pregunta
    questions.forEach(q => {
        const parts = q.split("\n").filter(item => item !== ''); // Divide la pregunta y las opciones
        const statement = parts[0].trim(); // Extrae la pregunta
        const options = parts[1]?.replace('[', '').replace(']', '').split('--').map(item => item.trim()).filter(item => item !== ''); // Extrae las opciones
        const correctAnswer = parts[2];

        examQuestions.push({
            statement,
            type: options ? 'multiple-choice' : 'open-ended',
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
        console.log(examText);

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
