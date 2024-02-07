import { AI_API_KEY, methodologies } from '../config.js'
import Activity from '../models/activity.model.js'
import axios from 'axios'


export const getAllActivities = async (req, res) => {
    try {
        const activities = await Activity.find({ user: req.userId })
        return res.status(200).json(activities)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const getActivityById = async (req, res) => {
    try {
        const activity = await Activity.findById(req.params.id).populate('user')

        if (activity) {
            res.status(200).json(activity)
        } else {
            res.status(404).json({ message: 'No se encontro la actividad' })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const getActivitiesBySubject = async (req, res) => {
    try {
        const activities = await Activity.find({ subject: req.params.subject })

        if (activities) {
            res.status(200).json(activities)
        } else {
            res.status(404).json({ message: 'No se encontraron actividades' })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const createActivity = async (req, res) => {
    const { methodology, topic, tools, competence, subject } = req.body

    try {
        const metodologiaEncontrada = methodologies.find( m => m.nombre === methodology );
		const tiempos = new Intl.ListFormat("es").format( metodologiaEncontrada.tiempos.map(tiempo => tiempo.toUpperCase().concat(':') ) )

        const prompt = `
            \n¿Que vas a hacer?
            Conviertete en una experta en pedagogia y didactica para crear una clase basada en la metodologia ${ methodology }.\n
            Debe ser acerca del tema ${ topic }.\n
            Debe evaluar la siguiente competencia: ${ competence }.\n
            Ten en cuenta que solo tienes acceso a las siguientes herramientas: ${ tools }.\n
            Cada metodologia tiene sus respectivos tiempos, en el caso de esta sus tiempos son: ${ tiempos }

            Especificaciones:
            \n- Se muy especifica a la hora de explicar.
            \n- Entregame la clase aplicando el siguiente formato: <El nombre de cada tiempo>:<Tu respuesta>
            \n- Solo dame lo que te pido, no añadas mas
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
            },
        };

        let generatedClass = ''
        
        // Realiza la solicitud a la API de OpenAI usando Axios
        await axios.post('https://api.openai.com/v1/completions', data, config)
            .then(response => {
                console.log('Respuesta de la API de OpenAI:', response.data.choices[0].text);
                generatedClass = response.data.choices[0].text
            })
            .catch(error => {
                console.error('Error al realizar la solicitud a la API de OpenAI:', error.response ? error.response.data : error.message);
            });

        const activity = new Activity({
            methodology,
            topic,
            tools,
            competence,
            user: req.userId,
            subject,
            generatedClass
        })
    
        const activitySaved = await activity.save()
        
        res.status(201).json({
            id: activitySaved._id,
            methodology: activitySaved.methodology,
            topic: activitySaved.topic,
            tools: activitySaved.tools,
            competence: activitySaved.competence,
            user: activitySaved.user,
            subject: activitySaved.subject,
            generatedClass: activitySaved.generatedClass,
            createdAt: activitySaved.createdAt,
            updatedAt: activitySaved.updatedAt
        })
        
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}
