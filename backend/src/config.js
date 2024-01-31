import 'dotenv/config'

export const PORT = process.env.PORT
export const JWT_SECRET = process.env.JWT_SECRET
export const AI_API_KEY = process.env.AI_API_KEY

export const PAYPAL_API_CLIENT = process.env.PAYPAL_API_CLIENT
export const PAYPAL_API_SECRET = process.env.PAYPAL_API_SECRET
export const PAYPAL_API = process.env.PAYPAL_API
export const URL = process.env.NODE_ENV === 'dev' ? process.env.DEV_URL : process.env.PROD_URL
export const DB_URL = process.env.NODE_ENV === 'dev' ? process.env.MONGO_DB_URI_TEST : process.env.MONGO_DB_URI

export const methodologies = [
    { nombre: "Constructivismo", tiempos: ["Problematización", "exploración", "comprensión", "creación", "evaluación"], fuentes: [] },
    { nombre: "Conductismo",  tiempos: ["Motivación", "explicación", "simulación", "demostración", "ejercitación", "evaluación"], fuentes: [] },
    { nombre: "Aprendizaje Basado en Proyectos (ABP)",  tiempos: ["Motivación", "problema", "explicación", "hipótesis", "problematización", "conclusiones", "afirmaciones"], fuentes: [] },
    { nombre: "Aprendizaje por Competencias",  tiempos: ["Introducción", "demostración", "comprensión (didáctica del juego)", "ejercitación", "evaluación"], fuentes: [] },
    { nombre: "Aprendizaje cooperativo",  tiempos: ["Problematización", "asignación de temáticas", "diálogo de hipótesis", "conclusiones"], fuentes: [] }
];
