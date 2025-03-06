import { getIcfesBySubject } from "../api/icfes.js";
import { useForm } from "react-hook-form";
import { useState } from "react";
import MainLayout from "../Layout/MainLayout";
import SubjectsSelect from "../components/SubjectsSelect.jsx";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import Modal from "../components/Modal.jsx";
import PDF from "../components/PDF.jsx";

function BancoDePreguntasPage() {
    const { user } = useAuth();
    const { register, handleSubmit } = useForm();
    const [icfes, setIcfes] = useState([]);

    const onSubmit = handleSubmit(async ({ subject }) => {
        try {
            const token = window.localStorage.getItem("token");
            const res = await getIcfesBySubject({ subject, token });
            setIcfes(res.data);
        } catch (err) {
            console.error("Error al obtener datos:", err);
        }
    });

    return (
        <MainLayout>
            <div className="max-w-3xl mx-auto px-6 py-8">
                <form
                    onSubmit={onSubmit}
                    className={`bg-white shadow-md rounded-lg p-6 mb-6 ${!user ? 'blur-lg' : ''}`}
                >
                    <label className="block text-gray-700 font-semibold mb-2">Filtrar preguntas por asignatura:</label>
                    <SubjectsSelect className="w-full p-2 border rounded-md shadow-sm focus:ring focus:ring-indigo-200" register={register} />

                    <button className="mt-4 w-full bg-indigo-600 text-white font-semibold py-2 rounded-lg shadow-md hover:bg-indigo-700 transition">Filtrar</button>
                </form>

                {icfes.length > 0 ? (
                    icfes.map((icfe) => (
                        <div key={icfe._id} className="bg-gray-50 shadow-lg rounded-lg p-6 mb-4 border">
                            <h3 className="text-xl font-bold text-indigo-700">{icfe.subject}</h3>
                            <p className="text-sm text-gray-500">{icfe.competence}</p>
                            <hr className="my-3" />
                            <div className="text-gray-700 space-y-2">
                                <p><span className="font-semibold">Párrafo Base:</span> {icfe.paragraph}</p>
                                <p><span className="font-semibold">Cantidad de Enunciados:</span> {icfe.questionCount}</p>
                            </div>
                            <div id="exam-content" className="space-y-6">
                                {icfe?.questions?.map((question, index) => (
                                    <div key={index} className="p-4 border-l-4 border-indigo-500 bg-gray-100 rounded-md shadow-sm">
                                        <p className="text-lg font-semibold text-gray-800">{question.statement}</p>
                                        <ul className="mt-2 space-y-2">
                                            {question.options.map((option, i) => (
                                                <li key={i} className="flex items-center space-x-2">
                                                    <input type="radio" name={`question-${index}`} className="h-4 w-4 text-indigo-600" />
                                                    <span className="text-gray-700">{option}</span>
                                                </li>
                                            ))}
                                        </ul>
                                        <p className="text-lg font-semibold text-gray-800">{question.correctAnswer}</p>
                                    </div>
                                ))}
                            </div>
                            <PDF examData={icfe} />
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-600 mt-6">No hay preguntas disponibles para la asignatura seleccionada.</p>
                )}

                {!user && (
                    <Modal message="Debes haber iniciado sesión para ver tu historial">
                        <Link to="/login" className="bg-purple-500 hover:bg-purple-600 w-20 font-bold text-white py-2 px-4 rounded-md transition duration-300">Login</Link>
                    </Modal>
                )}
            </div>
        </MainLayout>
    );
}

export default BancoDePreguntasPage;
