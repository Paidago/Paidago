import { useEffect, useState } from "react"
import { createActivity } from "../api/activity"
import { useForm } from 'react-hook-form'
import PayPalPayment from '../components/PayPalPayment.jsx'
import { useAuth } from "../context/AuthContext"
import { Link } from "react-router-dom"
import Modal from "../components/Modal.jsx"
import MainLayout from "../Layout/MainLayout"
import SubjectsSelect from "../components/SubjectsSelect.jsx"
import MapaMental from "../components/MapaMental.jsx"

const methodologies = [
    { nombre: "Constructivismo", secciones: ["Problematización", "exploración", "comprensión", "creación", "evaluación"], fuentes: [] },
    { nombre: "Conductismo", secciones: ["Motivación", "explicación", "simulación", "demostración", "ejercitación", "evaluación"], fuentes: [] },
    { nombre: "Aprendizaje Basado en Proyectos (ABP)", secciones: ["Motivación", "problema", "explicación", "hipótesis", "problematización", "conclusiones", "afirmaciones"], fuentes: [] },
    { nombre: "Aprendizaje por Competencias", secciones: ["Introducción", "demostración", "comprensión (didáctica del juego)", "ejercitación", "evaluación"], fuentes: [] },
    { nombre: "Aprendizaje cooperativo", secciones: ["Problematización", "asignación de temáticas", "diálogo de hipótesis", "conclusiones"], fuentes: [] }
];

function Planner() {
    const { user } = useAuth()
    const [showMindMap, setShowMindMap] = useState(false)
    const { register, handleSubmit } = useForm()
    const [activity, setActivity] = useState(null)
    const [file, setFile] = useState('');
    const [loading, setLoading] = useState(false)
    const [progress, setProgress] = useState(0);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };


    const onSubmit = handleSubmit(async info => {
        setLoading(true)
        setProgress(0);

        const interval = setInterval(() => {
            setProgress((prev) => (prev < 90 ? prev + 10 : prev));
        }, 500);

        try {
            const res = await createActivity({ ...info, token: window.localStorage.getItem('token') })
            setActivity(res.data)
            console.log(res.data);
        } catch (err) {
            console.log(err)
        } finally {
            clearInterval(interval)
            setLoading(false)
        }
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

        const palabras = ['DIÁLOGO', 'DE', 'HIPÓTESIS:', 'ASIGNACIÓN', 'TEMÁTICAS:', 'DIDÁCTICA', 'DEL', 'JUEGO:']

        return words.map((word, index) => {
            if (secciones.includes(word.trim())) {
                return <p key={index} className="font-bold text-indigo-600">{word} </p>;
            }
            if (palabras.includes(word.trim())) {
                if (word.includes(':')) return <p key={index} className="font-bold text-indigo-600">{word} </p>;
                return <span key={index} className="font-bold text-indigo-600">{word} </span>;
            }
            return <span key={index} className="text-gray-700">{word} </span>;
        });
    };



    return (
        <MainLayout>
            <figure className="border-y-4 text-center border-black py-7 mb-7">
                <p className="leading-loose text-2xl font-semibold text-gray-800">
                    "La verdadera dirección del desarrollo del pensamiento no es de lo individual a lo social, sino de lo social a lo individual."
                </p>
                <cite className="text-xl font-medium text-gray-600">—L. Vygotsky—</cite>
            </figure>

            <form
                id="form-clase"
                className={`container mx-auto p-10 bg-white rounded-2xl shadow-lg text-black transition-all ${!user && 'blur-sm opacity-50'
                    }`}
                onSubmit={onSubmit}
            >
                <h2 className="text-3xl font-extrabold mb-6 text-center uppercase text-indigo-600">
                    Crea tu clase!!
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block font-medium text-gray-700">Metodología</label>
                        <select
                            className="w-full mt-2 p-3 border border-gray-300 rounded-lg shadow-sm bg-white focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                            {...register("methodology", { required: true })}
                        >
                            <option value="Constructivismo">Constructivismo</option>
                            <option value="Conductismo">Conductismo</option>
                            <option value="Aprendizaje Basado en Proyectos (ABP)">Aprendizaje Basado en Proyectos (ABP)</option>
                            <option value="Aprendizaje por Competencias">Aprendizaje por Competencias</option>
                            <option value="Aprendizaje cooperativo">Aprendizaje cooperativo</option>
                        </select>
                    </div>
                    <div>
                        <label className="block font-medium text-gray-700">Tema</label>
                        <input
                            type="text"
                            className="w-full mt-2 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                            placeholder="Tema"
                            {...register("topic", { required: true })}
                        />
                    </div>
                    <div>
                        <label className="block font-medium text-gray-700">Competencia</label>
                        <input
                            type="text"
                            className="w-full mt-2 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                            placeholder="Competencia"
                            {...register("competence", { required: true })}
                        />
                    </div>
                    <div>
                        <label className="block font-medium text-gray-700">Asignatura</label>
                        <SubjectsSelect
                            className="w-full mt-2 p-3 border border-gray-300 rounded-lg shadow-sm"
                            register={register}
                        />
                    </div>
                    <div className="col-span-2">
                        <label className="block font-medium text-gray-700">Herramientas</label>
                        <textarea
                            className="w-full mt-2 p-3 border border-gray-300 rounded-lg shadow-sm resize-none min-h-24 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                            placeholder="Ej: Globos, ramas, espacio abierto, etc."
                            {...register("tools")}
                        />
                    </div>
                </div>
                <div className="mt-6 flex justify-center">
                    <button
                        id="btn-generador"
                        className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-lg shadow-md transition-all"
                    >
                        Generar clase
                    </button>
                    <span className="loader ml-3" id="loader"></span>
                </div>
            </form>

            {activity && (
                <div key={activity._id} className="bg-white mt-6 shadow-lg rounded-2xl p-6 border">
                    <h3 className="text-xl font-semibold text-indigo-600">{activity.topic}</h3>
                    <p className="text-sm text-gray-500">{activity.subject}</p>
                    <hr className="my-3" />
                    <div className="text-gray-700 space-y-2">
                        <p>
                            <span className="font-semibold">Metodología:</span> {activity.methodology}
                        </p>
                        <p>
                            <span className="font-semibold">Competencia:</span> {activity.competence}
                        </p>
                        <p>
                            <span className="font-semibold">Herramientas:</span> {activity.tools}
                        </p>
                    </div>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                        {highlightUppercaseWords(activity.generatedClass)}
                    </div>

                    {showMindMap ? (
                        <MapaMental topic={activity?.topic} competence={activity?.competence} />
                    ) : (
                        <div className="mt-4">
                            <button
                                onClick={() => setShowMindMap(true)}
                                className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg shadow-md transition-all"
                            >
                                ¿Deseas generar un mapa mental?
                            </button>
                            <span className="loader ml-3" id="loader"></span>
                        </div>
                    )}
                </div>
            )}

            {loading && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl font-bold mb-4">Generando Examen...</h2>
                        <p className="text-gray-700">Por favor, espera un momento.</p>
                        <div className="bg-gray-500 rounded h-4 text-center w-full relative transition-all">
                            <div
                                className="bg-blue-500 rounded h-4 text-center ablute transition-all"
                                style={{ width: `${progress}%` }}
                            ></div>
                            {progress}%
                        </div>
                    </div>
                </div>
            )}

            {!user && (
                <Modal message="Debes haber iniciado sesión para usar el planeador">
                    <Link
                        to="/login"
                        className="bg-purple-500 hover:bg-purple-600 font-bold text-white py-2 px-4 rounded-lg transition-all"
                    >
                        Login
                    </Link>
                </Modal>
            )}

            {user && !user.paymentID && (
                <Modal message="Para hacer uso del planeador debes adquirir nuestra membresía!!">
                    <PayPalPayment />
                </Modal>
            )}
        </MainLayout>
    );

}

export default Planner