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

        const messages = [
            {
                "role": "system",
                "content": "Eres una experta en pedagogía y didáctica. Debes crear una **clase estructurada** siguiendo la metodología proporcionada."
            },
            {
                "role": "user",
                "content": `**Detalles**:
                ${file ? `La clase debe basarse en el siguiente PDF: "${texto}". Respeta estrictamente la metodología ${methodology}.` : `Debes seguir la metodología: ${methodology}.`}  
                El tema central de la clase es: **${topic}**.  
                Debe evaluar la siguiente competencia: **${competence}**.  
                Las únicas herramientas disponibles son: **${tools}**.  
                Los secciones asignadas para esta clase son: **${sections}**.  
    
                **Especificaciones clave**:  
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
    
                Genera la clase cumpliendo estas condiciones sin desviarte del formato solicitado.`
            }
        ]


        let generatedClass = ''

        // Realiza la solicitud a la API de OpenAI usando Axios
        await axios.post('https://api.openai.com/v1/chat/completions', { ...data, messages }, config)
            .then(response => {
                console.log('Respuesta de la API de OpenAI:', response.data.choices[0].message.content);
                generatedClass = response.data.choices[0].message.content
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

function generateNode(index, concept, totalNodes) {
    const centerX = 0; // Posición central del nodo principal
    const centerY = 0;
    const radius = 350; // Distancia desde el centro
    const angle = (index / totalNodes) * (2 * Math.PI); // Espaciado uniforme en círculo

    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);

    return {
        id: index.toString(),
        data: { label: concept },
        position: { x, y },
        style: {
            backgroundColor: "#ffffff",  // Fondo blanco para diferenciarlo de la idea principal
            color: "#333",  // Texto oscuro para contraste
            padding: "12px 16px",  // Espaciado equilibrado
            borderRadius: "10px",  // Bordes más suaves
            boxShadow: "2px 2px 8px rgba(0, 0, 0, 0.15)",  // Sombra ligera para resaltar
            border: "2px solid #D6D6D6",  // Borde gris claro para dar estructura
            fontSize: "14px",  // Tamaño de fuente un poco menor que la idea principal
            fontWeight: "500",  // Peso de fuente medio
            textAlign: "center",  // Centrado del texto
            transition: "all 0.3s ease-in-out",  // Suavidad en interacciones
            cursor: "pointer",  // Interactivo
            margin: "8px"  // Espaciado uniforme entre nodos secundarios
        },
    };
}

function generateEdges(nodes) {
    const edges = nodes.map((node, index) => {
        const nextIndex = (index + 1) % nodes.length; // Conectar el siguiente nodo (incluyendo el último con el primero)
        return {
            id: `edge-${index}`,
            source: node.id,
            target: nodes[nextIndex].id,
            animated: true
        };
    });

    for (let i = 0; i < nodes.length; i++) {
        edges.push({
            id: `edge-1000-${i + 1}`,
            source: "10000",
            target: i.toString(),
            animated: true
        });
    }

    return edges;
}


const extractConcepts = async (topic, competence) => {
    const messages = [
        {
            "role": "system",
            "content": `Eres una experta en redacciones y resúmenes. Debes **darme los conceptos clave** acerca de ${topic} relacionados con la competencia **${competence}**.`
        },
        {
            "role": "user",
            "content": `Debes darme los 10 conceptos mas importantes, no seas muy extenso, trata de condensarlo todo en palabras o conceptos clave y deben estar enumerados desde el 1 al 10 
            Ejemplo:
            1. El sistema solar
            2. Los planetas
            3. La tierra
            4. La luna`
        }
    ]

    let conceptos = []

    // Realiza la solicitud a la API de OpenAI usando Axios
    await axios.post('https://api.openai.com/v1/chat/completions', { ...data, messages }, config)
        .then(response => {
            console.log('Respuesta de la API de OpenAI:', response.data.choices[0].message.content);
            conceptos = response.data.choices[0].message.content.trim().split('\n')
            console.log(conceptos)
        })
        .catch(error => {
            console.error('Error al realizar la solicitud a la API de OpenAI:', error.response ? error.response.data : error.message);
        });

    const nodes = conceptos.map((concept, index) => generateNode(index, concept, conceptos.length));

    const edges = generateEdges(nodes);

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
    const { topic, competence } = req.body;
    if (!topic) return res.status(400).json({ error: "No se envió texto" });

    const { nodes, edges } = await extractConcepts(topic, competence); // Extraer conceptos clave

    return res.json({
        nodes,
        edges
    });
}