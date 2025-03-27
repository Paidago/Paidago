import { config, data } from '../config.js'
import Icfes from '../models/icfes.model.js'
import axios from 'axios'

export const getAllIcfes = async (req, res) => {
    try {
        const icfes = await Icfes.find({ createdBy: req.userId })
        return res.status(200).json(icfes)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const getIcfesById = async (req, res) => {
    try {
        const icfes = await Icfes.findById(req.params.id).populate('createdBy')

        if (icfes) {
            res.status(200).json(icfes)
        } else {
            res.status(404).json({ message: 'No se encontro el examen' })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const getIcfesBySubject = async (req, res) => {
    try {
        const { subject } = req.body
        console.log(subject)
        const icfes = await Icfes.find({ subject })
        return res.status(200).json(icfes)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const parseIcfesQuestions = (examText) => {
    const icfesQuestions = []
    const questions = examText.trim().split('\n\n')// Divide por número de pregunta
    questions.forEach(q => {
        const parts = q.split("\n").filter(item => item !== ''); // Divide la pregunta y las opciones
        const statement = parts[0].trim(); // Extrae la pregunta
        const options = parts[1]?.replace('[', '').replace(']', '').split('--').map(item => item.trim()).filter(item => item !== ''); // Extrae las opciones
        const correctAnswer = parts[2];

        icfesQuestions.push({
            statement,
            options,
            correctAnswer
        });
    })

    return icfesQuestions;
};

export const createIcfes = async (req, res) => {
    const { subject, competence, paragraph, questionCount } = req.body

    const prompt = `
        📌 **Objetivo**:
        Conviértete en una experta en pedagogía y en la creación de exámenes tipo ICFES para generar preguntas de selección múltiple con única respuesta correcta a partir de un párrafo base. 

        📌 **Contexto**:
        Debes generar preguntas con la rigurosidad del examen ICFES aplicado en Colombia, asegurando que cada una evalúe habilidades de comprensión, análisis y aplicación del conocimiento en la asignatura **${subject}**, de acuerdo con la siguiente competencia: **${competence}**.

        📌 **Párrafo base**:
        "${paragraph}"

        📌 **Instrucciones**:
        - **Las preguntas deben ser estrictamente coherentes con el párrafo base.**  
        - **Cada pregunta debe evaluar la competencia especificada.**  
        - **Las preguntas deben estar diseñadas en un nivel de dificultad similar al ICFES.**  
        - **Debe haber solo UNA opción correcta.**  
        - **El distractor debe ser plausible para evitar respuestas obvias.**  
        - **Genera exactamente ${questionCount} preguntas.**  
        - **El formato de entrega debe ser estrictamente el siguiente:**
        
        **Ejemplo de formato de salida:**
        1) ¿Cuál es la capital de Francia?  
        [París--Londres--Berlín--Madrid]  
        Respuesta correcta: [París]  

        2) ¿Cuál es el resultado de 2 + 2?  
        [3--4--5--6]  
        Respuesta correcta: [4]  

        Genera las preguntas respetando este mismo formato sin añadir información extra.
    `;

    const messages = [
        {
            "role": "system",
            "content": "Conviértete en una experta en pedagogía y en la creación de exámenes tipo ICFES para generar preguntas de selección múltiple con única respuesta correcta a partir de un párrafo base. "
        },
        {
            "role": "user",
            "content": `Debes generar preguntas con la rigurosidad del examen ICFES aplicado en Colombia, asegurando que cada una evalúe habilidades de comprensión, análisis y aplicación del conocimiento en la asignatura **${subject}**, de acuerdo con la siguiente competencia: **${competence}**.

            📌 **Párrafo base**:
            "${paragraph}"

            📌 **Instrucciones**:
            - **Las preguntas deben ser estrictamente coherentes con el párrafo base.**  
            - **Cada pregunta debe evaluar la competencia especificada.**  
            - **Las preguntas deben estar diseñadas en un nivel de dificultad similar al ICFES.**  
            - **Debe haber solo UNA opción correcta.**  
            - **El distractor debe ser plausible para evitar respuestas obvias.**  
            - **Genera exactamente ${questionCount} preguntas.**  
            - **El formato de entrega debe ser estrictamente el siguiente:**
            
            **Ejemplo de formato de salida:**
            1) ¿Cuál es la capital de Francia?  
            [París--Londres--Berlín--Madrid]  
            Respuesta correcta: [París]  

            2) ¿Cuál es el resultado de 2 + 2?  
            [3--4--5--6]  
            Respuesta correcta: [4]  

            Genera las preguntas respetando este mismo formato sin añadir información extra.`
        }
    ]


    try {
        // Realiza la solicitud a la API de OpenAI
        const response = await axios.post('https://api.openai.com/v1/chat/completions', { ...data, messages }, config);
        console.log('Respuesta de la API de OpenAI:', response.data.choices[0].message.content);
        const questions = parseIcfesQuestions(response.data.choices[0].message.content)
        console.log('Preguntas generadas:', questions);

        const icfes = await Icfes.create({
            subject,
            competence,
            paragraph,
            questionCount,
            questions,
            createdBy: req.userId
        })

        return res.status(201).json(icfes)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}