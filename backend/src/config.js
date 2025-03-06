import 'dotenv/config'

//NODE
export const JWT_SECRET = process.env.JWT_SECRET
export const PORT = process.env.PORT

//AI
export const TOKENS = parseInt(process.env.TOKENS)
export const MODEL = process.env.MODEL
export const AI_API_KEY = process.env.AI_API_KEY


export const INSTAGRAM_TOKEN = process.env.INSTAGRAM_TOKEN

//PAYPAL
export const PAYPAL_API_CLIENT = process.env.PAYPAL_API_CLIENT
export const PAYPAL_API_SECRET = process.env.PAYPAL_API_SECRET
export const PAYPAL_API = process.env.PAYPAL_API

//URLS
export const URL = process.env.NODE_ENV === 'dev' ? process.env.DEV_URL : process.env.PROD_URL
export const DB_URL = process.env.NODE_ENV === 'dev' ? process.env.MONGO_DB_URI_TEST : process.env.MONGO_DB_URI

//METHODOLOGIES
export const methodologies = [
    { nombre: "Constructivismo", secciones: ["Problematización", "exploración", "comprensión", "creación", "evaluación"], fuentes: [] },
    { nombre: "Conductismo",  secciones: ["Motivación", "explicación", "simulación", "demostración", "ejercitación", "evaluación"], fuentes: [] },
    { nombre: "Aprendizaje Basado en Proyectos (ABP)",  secciones: ["Motivación", "problema", "explicación", "hipótesis", "problematización", "conclusiones", "afirmaciones"], fuentes: [] },
    { nombre: "Aprendizaje por Competencias",  secciones: ["Introducción", "demostración", "comprensión (didáctica del juego)", "ejercitación", "evaluación"], fuentes: [] },
    { nombre: "Aprendizaje cooperativo",  secciones: ["Problematización", "asignación de temáticas", "diálogo de hipótesis", "conclusiones"], fuentes: [] }
];

export const data = {
    model: MODEL,
    max_tokens: TOKENS, // Ajusta según sea necesario
};

export const config = {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${AI_API_KEY}`,
    },
};
