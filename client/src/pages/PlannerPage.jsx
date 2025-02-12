import { useEffect, useState } from "react"
import { createActivity } from "../api/activity"
import Carousel from "../components/CarouselPlanner"
import { useForm } from 'react-hook-form'
import Card from "../components/CardCarousel"
import PayPalPayment from '../components/PayPalPayment.jsx'
import { useAuth } from "../context/AuthContext"
import { Link } from "react-router-dom"
import Modal from "../components/Modal.jsx"
import MainLayout from "../Layout/MainLayout"
import SubjectsSelect from "../components/SubjectsSelect.jsx"

const methodologies = [
    { nombre: "Constructivismo", secciones: ["Problematización", "exploración", "comprensión", "creación", "evaluación"], fuentes: [] },
    { nombre: "Conductismo",  secciones: ["Motivación", "explicación", "simulación", "demostración", "ejercitación", "evaluación"], fuentes: [] },
    { nombre: "Aprendizaje Basado en Proyectos (ABP)",  secciones: ["Motivación", "problema", "explicación", "hipótesis", "problematización", "conclusiones", "afirmaciones"], fuentes: [] },
    { nombre: "Aprendizaje por Competencias",  secciones: ["Introducción", "demostración", "comprensión (didáctica del juego)", "ejercitación", "evaluación"], fuentes: [] },
    { nombre: "Aprendizaje cooperativo",  secciones: ["Problematización", "asignación de temáticas", "diálogo de hipótesis", "conclusiones"], fuentes: [] }
];

function Planner() {
    const { user } = useAuth()
    const { register, handleSubmit } = useForm()
    const [activity, setActivity] = useState(null)
    const [file, setFile] = useState('');
    const [loading, setLoading] = useState(false)

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };


    const onSubmit = handleSubmit(async info => {
        setLoading(true)
        console.log(info)
        const res = await createActivity({ ...info, token: window.localStorage.getItem('token') })
        setActivity(res.data)
        console.log(res.data)
        setLoading(false)
    })
  
    const highlightUppercaseWords = (text) => {
        const words = text.replace(/\n+/g, ' ')
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


    return (
        <MainLayout >
            <figure className="border-y-4 text-center border-black py-7 mb-7">
                <p className="leading-loose text-xl">&#34;La verdadera dirección del desarrollo del pensamiento no es de lo invididual a lo social, sino de lo social a lo individual.&#34;</p>
                <cite className="text-xl">—L. Vygotsky—</cite>
            </figure>

            <form id="form-clase" className={`container mx-auto p-8 bg-slate-200 rounded-lg shadow-md text-black  ${!user && 'blur-lg'}`} onSubmit={onSubmit}>
                <h2 className="text-2xl font-bold mb-4 text-center uppercase">Crea tu clase!!</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="mb-4">
                        <label htmlFor="filtro-metodologias" className="block text-black">Metodologia</label>
                        <select className="form-select w-full mt-1 p-2 border border-black rounded-md shadow-sm bg-white" {...register("methodology", { required: true })}>
                            <option value="Constructivismo">Constructivismo</option>
                            <option value="Conductismo">Conductismo</option>
                            <option value="Aprendizaje Basado en Proyectos (ABP)">Aprendizaje Basado en Proyectos (ABP)</option>
                            <option value="Aprendizaje por Competencias">Aprendizaje por Competencias</option>
                            <option value="Aprendizaje cooperativo">Aprendizaje cooperativo</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="temaClase" className="block text-black">Tema</label>
                        <input type="text" className="form-input w-full mt-1 p-2 border border-black rounded-md shadow-sm placeholder:text-black" placeholder="Tema" {...register("topic", { required: true })} />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="competenciaClase" className="block text-black">Competencia</label>
                        <input type="text" className="form-input w-full mt-1 p-2 border border-black rounded-md shadow-sm placeholder:text-black" placeholder="Competencia" {...register("competence", { required: true })} />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="asignatura" className="block text-black">Asignatura</label>
                        <SubjectsSelect className="form-select w-full mt-1 p-2 border border-black rounded-md shadow-sm" register={register} />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="herramientasClase" className="block text-black">Herramientas</label>
                        <textarea className="form-input w-full mt-1 p-2 border border-black rounded-md shadow-sm resize-none min-h-20 placeholder:text-black" placeholder="Ingrese las herramientas con las que dispone para realizar la clase, Ej: Globos, ramas, espacio abierto, etc"
                            {...register("tools", { required: false })}></textarea>
                    </div>
                    {/* <div className="p-4 bg-gray-100 rounded-xl border border-black">
                        <h2 className="mb-4" >¿Deseas crear tu clase a partir de un pdf? Insertalo!!</h2>
                        <input type="file" accept="application/pdf" onChange={handleFileChange} className="bg-blue-500 text-white py-2 px-4 rounded-md" />
                    </div> */}
                </div>
                <div className="mt-4">
                    <button id="btn-generador" className="bg-blue-500 text-white py-2 px-4 rounded-md">Generar clase</button>
                    <span className="loader ml-2" id="loader"></span>
                </div>
            </form>

            {
                activity && (<div key={activity._id} className="bg-white mt-4 shadow-md rounded-lg p-5 border mb-4">
                    <h3 className="text-lg font-semibold text-indigo-600">{activity.topic}</h3>
                    <p className="text-sm text-gray-500">{activity.subject}</p>
                    <hr className="my-3" />
                    <div className="text-gray-700 space-y-2">
                        <p><span className="font-semibold">Metodología:</span> {activity.methodology}</p>
                        <p><span className="font-semibold">Competencia:</span> {activity.competence}</p>
                        <p><span className="font-semibold">Herramientas:</span> {activity.tools}</p>
                    </div>
                    <div className="mt-4 bg-gray-100 p-3 rounded-md">
                        {/* <h4 className="font font-semibold text-gray-700 mb-2">Clase Generada:</h4> */}
                        {highlightUppercaseWords(activity.generatedClass)}
                    </div>
                </div>)
            }

            {
                loading && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                            <h2 className="text-xl font-bold mb-4">Generando Clase...</h2>
                            <p className="text-gray-700">Por favor, espera un momento.</p>
                        </div>
                    </div>
                )
            }

            {!user &&
                <Modal message='Debes haber iniciado sesion para usar el planeador'>
                    <Link to="/login" className="bg-purple-500 w-20 font-bold text-white py-2 px-4 rounded-md">Login</Link>
                </Modal>
            }


            {user && !user.paymentID && (
                <Modal message='Para hacer uso del planeador debes adquirir nuestra membresia!!'>
                    <PayPalPayment />
                </Modal>
            )}
        </MainLayout>
    )
}

export default Planner