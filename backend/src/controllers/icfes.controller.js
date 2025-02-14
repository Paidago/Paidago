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
        const icfes = await Icfes.find({ subject: req.body.subject, createdBy: req.userId })

        if (icfes) {
            res.status(200).json(icfes)
        } else {
            res.status(404).json({ message: 'No se encontraron examenes' })
        }
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
        Conviertete en una experta en pedagogia y en la creacion de examenes tipo ICFES para crear preguntas de seleccion multiple a partir de un parrafo base.
        El parrafo es el siguiente: "${paragraph}".

        📌 **Instrucciones**:
        - Cada pregunta debe tener un enunciado y 4 opciones de respuesta.
        - Solo una de las opciones es correcta.
        - Debes crear ${questionCount} preguntas.
        - Recuerda que las preguntas deben ser coherentes con el parrafo base.
        - Las preguntas deben evaluar estrictamente la siguiente competencia: **${competence}** y deben ser sobre la asignatura: ${subject}.
        - Las preguntas me las debes entregar estrictamente en el siguiente formato:
            1) ¿Cuál es la capital de Francia?  
            [París--Londres--Berlín--Madrid]  
            Respuesta correcta: [París]  
            
            2) ¿Cuál es el resultado de 2 + 2?  
            [3--4--5--6]  
            Respuesta correcta: [4]
            Genera el examen respetando este mismo formato y sin añadir información extra.
    `

    try {
        // Realiza la solicitud a la API de OpenAI
        const response = await axios.post('https://api.openai.com/v1/completions', { ...data, prompt }, config);
        console.log('Respuesta de la API de OpenAI:', response.data.choices[0].text);
        const questions = parseIcfesQuestions(response.data.choices[0].text)
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