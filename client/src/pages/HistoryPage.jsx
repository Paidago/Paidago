import { getAllActivities, getActivitiesBySubject } from "../api/activity"
import { useForm } from 'react-hook-form'
import { useState } from "react"
import MainLayout from "../Layout/MainLayout"
import SubjectsSelect from "../components/SubjectsSelect.jsx"
import { useAuth } from "../context/AuthContext"
import { Link } from "react-router-dom"
import Modal from "../components/Modal.jsx"

function History() {
    const { user } = useAuth()
    const { register, handleSubmit } = useForm()
    const [activities, setActivities] = useState([])

    const methodologies = [
        { nombre: "Constructivismo", secciones: ["Problematización", "exploración", "comprensión", "creación", "evaluación"], fuentes: [] },
        { nombre: "Conductismo",  secciones: ["Motivación", "explicación", "simulación", "demostración", "ejercitación", "evaluación"], fuentes: [] },
        { nombre: "Aprendizaje Basado en Proyectos (ABP)",  secciones: ["Motivación", "problema", "explicación", "hipótesis", "problematización", "conclusiones", "afirmaciones"], fuentes: [] },
        { nombre: "Aprendizaje por Competencias",  secciones: ["Introducción", "demostración", "comprensión (didáctica del juego)", "ejercitación", "evaluación"], fuentes: [] },
        { nombre: "Aprendizaje cooperativo",  secciones: ["Problematización", "asignación de temáticas", "diálogo de hipótesis", "conclusiones"], fuentes: [] }
    ];

    const highlightUppercaseWords = (activity) => {
        const words = activity.generatedClass.replace(/\n+/g, ' ')
        .replace(/\*\*/g, ' ')
        .replace(/:/g, ': ')
        .replace(/\[/g, ' ')
        .replace(/\]/g, ' ')
        .replace(/\s+/g, ' ')
        .replace(/[\u{1F600}-\u{1F64F}]/gu, '')
        .replace(/�/g, '')
        .trim()
        .split(' ').filter(word => word !== '');
        
        const metodologia = methodologies.find(m => m.nombre === activity.methodology);
        const secciones = metodologia.secciones.map(s => s.toUpperCase().concat(':'));

        const palabras = ['DIÁLOGO','DE','HIPÓTESIS:', 'ASIGNACIÓN', 'TEMÁTICAS:', 'DIDÁCTICA', 'DEL', 'JUEGO:']
        
        return words.map((word, index) => {
            if (secciones.includes(word.trim())) {
                return <p key={index} className="font-bold text-indigo-600">{word} </p>;
            }
            if(palabras.includes(word.trim())){
                if (word.includes(':')) return <p key={index} className="font-bold text-indigo-600">{word} </p>;
                return <span key={index} className="font-bold text-indigo-600">{word} </span>;
            }
            return <span key={index} className="text-gray-700">{word} </span>;
        });
    };

    const onSubmit = handleSubmit(async ({ subject }) => {
        try {
            console.log(subject)
            let res
            if (subject === 'Todas')
                res = await getAllActivities(window.localStorage.getItem('token'))
            else
                res = await getActivitiesBySubject({ subject, token: window.localStorage.getItem('token') })
            setActivities(res.data)
        } catch (err) {
            console.log(err)
        }
    })

    return (
        <MainLayout>
            <form onSubmit={onSubmit} className={`container mb-4 mx-auto p-8 bg-slate-200 rounded-lg shadow-md text-black ${!user && 'blur-lg'}`}>
                <label htmlFor="">Puedes filtrar las clases por asignatura!!</label>
                <SubjectsSelect className="form-select w-full mb-4 mt-1 p-2 border border-black rounded-md shadow-sm" register={register} >
                    <option value='Todas'>Todas</option>
                </SubjectsSelect>
                <button className="bg-blue-500 text-white py-2 px-4 rounded-md mt-4">Filtrar</button>
            </form>
            {
                user && activities && activities.map(activity => (
                    <div key={activity._id} className="bg-white shadow-md rounded-lg p-5 border mb-4">
                        <h3 className="text-lg font-semibold text-indigo-600">{activity.topic}</h3>
                        <p className="text-sm text-gray-500">{activity.subject}</p>
                        <hr className="my-3" />
                        <div className="text-gray-700 space-y-2">
                            <p><span className="font-semibold">Metodología:</span> {activity.methodology}</p>
                            <p><span className="font-semibold">Competencia:</span> {activity.competence}</p>
                            <p><span className="font-semibold">Herramientas:</span> {activity.tools}</p>
                        </div>
                        <div className="mt-4 bg-gray-100 p-3 rounded-md">
                            <h4 className="font font-semibold text-gray-700 mb-2">Clase Generada:</h4>
                            <p className="text-gray-600 text-sm italic">{highlightUppercaseWords(activity)}</p>
                        </div>
                    </div>
                ))
            }
            {!user &&
                <Modal message='Debes haber iniciado sesion para ver tu historial'>
                    <Link to="/login" className="bg-purple-500 w-20 font-bold text-white py-2 px-4 rounded-md">Login</Link>
                </Modal>
            }
        </MainLayout>
    )
}

export default History