import { AI_API_KEY } from '../config.js'
import Activity from '../models/activity.model.js'
import Exam from '../models/exam.model.js'
import axios from 'axios'


export const getExams = async (req,res) => {
    try {
        const exams = await Exam.find({ user: req.userId })
        return res.status(200).json(exams)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const createExamBySubject = async (req, res) => {
    try {
        const { subject, especifications } = req.body
        const activities = await Activity.find({ subject })

        //Pedirle a chat GPT que cree un examen con la informacion recopilada
        const prompt = `
        Conviertete en una experta en pedagogia y didactica para crear un examen sobre ${subject} de forma acertiva y precisa con las siguientes especificaciones: ${especifications}.
        El examen debe ser basado en la siguiente informacion: ${activities.map(activity => activity.generatedClass) }
`

        const data = {
            model:'gpt-3.5-turbo-instruct',
            prompt,
            max_tokens: 400, // Ajusta según sea necesario
        };
        
        const config = {
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${AI_API_KEY}`,
            }
        };

        // Realiza la solicitud a la API de OpenAI usando Axios
        const response = await axios.post('https://api.openai.com/v1/completions', data, config)
        const exam = response.data.choices[0].text
        console.log('Respuesta de la API de OpenAI:', response.data.choices[0].text);

        const examCreated = new Exam({
            subject,
            especifications,
            exam,
            user: req.userId
        })
        await examCreated.save()
        return res.status(200).json(exam)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}