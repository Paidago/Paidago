import { getAllActivities, getActivitiesBySubject } from "../api/activity";
import { useForm } from "react-hook-form";
import { useState } from "react";
import MainLayout from "../Layout/MainLayout";
import SubjectsSelect from "../components/SubjectsSelect.jsx";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import Modal from "../components/Modal.jsx";

function History() {
    const { user } = useAuth();
    const { register, handleSubmit } = useForm();
    const [activities, setActivities] = useState([]);

    const methodologies = [
        { nombre: "Constructivismo", secciones: ["Problematización", "Exploración", "Comprensión", "Creación", "Evaluación"] },
        { nombre: "Conductismo", secciones: ["Motivación", "Explicación", "Simulación", "Demostración", "Ejercitación", "Evaluación"] },
        { nombre: "Aprendizaje Basado en Proyectos (ABP)", secciones: ["Motivación", "Problema", "Explicación", "Hipótesis", "Problematización", "Conclusiones", "Afirmaciones"] },
        { nombre: "Aprendizaje por Competencias", secciones: ["Introducción", "Demostración", "Comprensión (Didáctica del Juego)", "Ejercitación", "Evaluación"] },
        { nombre: "Aprendizaje Cooperativo", secciones: ["Problematización", "Asignación de Temáticas", "Diálogo de Hipótesis", "Conclusiones"] }
    ];

    const highlightUppercaseWords = (activity) => {
        const formattedText = activity.generatedClass
            .replace(/\n+/g, " ")
            .replace(/\*\*/g, " ")
            .replace(/:/g, ": ")
            .replace(/\s+/g, " ")
            .trim()
            .split(" ")
            .filter(word => word !== "");

        const metodologia = methodologies.find(m => m.nombre === activity.methodology);
        const secciones = metodologia?.secciones.map(s => s.toUpperCase().concat(":")) || [];

        return formattedText.map((word, index) => (
            secciones.includes(word.trim()) ? (
                <span key={index} className="font-bold text-indigo-600">{word} </span>
            ) : (
                <span key={index} className="text-gray-700">{word} </span>
            )
        ));
    };

    const onSubmit = handleSubmit(async ({ subject }) => {
        try {
            let res = subject === "Todas"
                ? await getAllActivities(localStorage.getItem("token"))
                : await getActivitiesBySubject({ subject, token: localStorage.getItem("token") });

            setActivities(res.data);
        } catch (err) {
            console.error("Error al obtener actividades:", err);
        }
    });

    return (
        <MainLayout>
            <div className="max-w-3xl mx-auto px-6 py-8">
                <form onSubmit={onSubmit} className={`bg-white shadow-md rounded-lg p-6 mb-6 ${!user && "blur-sm"}`}>
                    <label className="block text-gray-700 font-semibold mb-2">Filtra las clases por asignatura:</label>
                    <SubjectsSelect register={register} className="w-full p-2 border rounded-md shadow-sm focus:ring focus:ring-indigo-200">
                        <option value="Todas">Todas</option>
                    </SubjectsSelect>
                    <button className="mt-4 w-full bg-indigo-600 text-white font-semibold py-2 rounded-lg shadow-md hover:bg-indigo-700 transition">
                        Filtrar
                    </button>
                </form>

                {user && activities.length > 0 ? (
                    activities.map(activity => (
                        <div key={activity._id} className="bg-gray-50 shadow-lg rounded-lg p-6 mb-4 border">
                            <h3 className="text-xl font-bold text-indigo-700">{activity.topic}</h3>
                            <p className="text-sm text-gray-500">{activity.subject}</p>
                            <hr className="my-3" />
                            <div className="text-gray-700 space-y-2">
                                <p><span className="font-semibold">Metodología:</span> {activity.methodology}</p>
                                <p><span className="font-semibold">Competencia:</span> {activity.competence}</p>
                                <p><span className="font-semibold">Herramientas:</span> {activity.tools}</p>
                            </div>
                            <div className="mt-4 bg-white p-4 rounded-md border border-gray-200">
                                <h4 className="text-gray-800 font-semibold mb-2">Clase Generada:</h4>
                                <p className="text-gray-700 text-sm leading-relaxed">{highlightUppercaseWords(activity)}</p>
                            </div>
                        </div>
                    ))
                ) : user && activities.length === 0 ? (
                    <p className="text-center text-gray-600 mt-6">No hay actividades disponibles.</p>
                ) : (
                    <Modal message="Debes haber iniciado sesión para ver tu historial">
                        <Link to="/login" className="bg-purple-500 w-24 text-center text-white font-semibold py-2 px-4 rounded-md shadow-md hover:bg-purple-700 transition">
                            Iniciar sesión
                        </Link>
                    </Modal>
                )}
            </div>
        </MainLayout>
    );
}

export default History;
