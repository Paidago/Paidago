import { config, data, methodologies } from '../config.js'
import Activity from '../models/activity.model.js'
import axios from 'axios'
import pdf from 'pdf-parse'
import natural from 'natural'


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
        const activities = await Activity.find({ subject: req.body.subject, user: req.userId })

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
    const { methodology, topic, tools, competence, subject, file } = req.body

    try {
        const metodologiaEncontrada = methodologies.find(m => m.nombre === methodology);
        const sections = new Intl.ListFormat("es").format(metodologiaEncontrada.secciones.map(section => section.toUpperCase().concat(':')))

        let texto = ''

        if (file) {
            const info = await pdf(req.file.buffer);
            texto = info.text.substring(0, 5000); // Limitar a 5000 caracteres
        }

        
        const prompt = `
            📌 **Objetivo**:  
            Eres una experta en pedagogía y didáctica. Debes crear una **clase estructurada** siguiendo la metodología proporcionada.  

            📖 **Detalles**:  
            ${file ? `La clase debe basarse en el siguiente PDF: "${texto}". Respeta estrictamente la metodología ${methodology}.` : `Debes seguir la metodología: ${methodology}.`}  
            El tema central de la clase es: **${topic}**.  
            Debe evaluar la siguiente competencia: **${competence}**.  
            Las únicas herramientas disponibles son: **${tools}**.  
            Los secciones asignadas para esta clase son: **${sections}**.  

            📌 **Especificaciones clave**:  
            -**Usa únicamente texto limpio y estructurado.**  
            - **No agregues emojis, caracteres especiales o decoraciones innecesarias.**  
            - **Los tiempos deben estar en MAYÚSCULAS** y deben seguir el siguiente formato:  
            SECCION: Explicación detallada...
            - **No agregues encabezados adicionales como "Clase Generada" o "Aquí tienes la clase".**  
            - Respeta estrictamente el formato y la estructura de la respuesta.  

            Ejemplo de salida esperada:  
            PROBLEMATIZACIÓN: Explicación detallada...  
            EXPLORACIÓN: Explicación detallada...  
            APLICACIÓN: Explicación detallada...  

            Genera la clase cumpliendo estas condiciones sin desviarte del formato solicitado.  
        `;


        let generatedClass = ''

        // Realiza la solicitud a la API de OpenAI usando Axios
        await axios.post('https://api.openai.com/v1/completions', {...data, prompt}, config)
            .then(response => {
                console.log('Respuesta de la API de OpenAI:', response.data.choices[0].text);
                generatedClass = response.data.choices[0].text
            })
            .catch(error => {
                console.error('Error al realizar la solicitud a la API de OpenAI:', error.response ? error.response.data : error.message);
            });

        // generatedClass = cleanClass(generatedClass, methodology)

        const activity = new Activity({
            methodology,
            topic,
            tools,
            competence,
            sections,
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
            sections: activitySaved.sections,
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


const extractConcepts = async text =>{
    const prompt = `
        Eres una experta en redacciones y resúmenes. Creé esta clase: ${text} y debes **darme los conceptos clave**
        que yo puedo tratar en esa clase para apartir de ahí crear un mapa mental.
        No me des un formato de clase, sino conceptos importantes que yo pueda tratar
        Los conceptos deben estar enumerados desde el 1 hasta los que consideres importantes.
        Ejemplo:
        1. El sistema solar
        2. Los planetas
        3. La tierra
        4. La luna
    `

    let conceptos = []

    // Realiza la solicitud a la API de OpenAI usando Axios
    await axios.post('https://api.openai.com/v1/completions', {...data, prompt}, config)
    .then(response => {
        console.log('Respuesta de la API de OpenAI:', response.data.choices[0].text);
        conceptos = response.data.choices[0].text.trim().split('\n')
        console.log(conceptos)
    })
    .catch(error => {
        console.error('Error al realizar la solicitud a la API de OpenAI:', error.response ? error.response.data : error.message);
    });

    const nodes = conceptos.map((concept, index) => {
        return {
            id: index.toString(),
            data: { label: concept },
            position: { x: Math.random() * 250, y: Math.random() *  5 },
            style: { backgroundColor: "#f0f0f0", padding: 10, borderRadius: 5 },
        }
    })

    const edges = nodes.map((node, index) => {
        return {
            id: `e${index}-${index + 1}`,
            source: node.id,
            target: (index + 1).toString(),
            animated: true
        }
    })

    return { nodes, edges }
    
    // [
    //     {
    //         id: "1",
    //         data: { label: },
    //         position: { x: 250, y: 5 },
    //         style: { backgroundColor: "#f0f0f0", padding: 10, borderRadius: 5 },
    //     },
    // ]

}


export const generateMindMap = async (req, res) => {
    const { classText } = req.body;
    if (!classText) return res.status(400).json({ error: "No se envió texto" });

    const mindmapData = await extractConcepts(classText); // Extraer conceptos clave
    console.log(mindmapData)
    return res.json(mindmapData);
}