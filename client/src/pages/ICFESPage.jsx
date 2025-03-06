import { useState } from "react";
import { createIcfes } from "../api/icfes.js";
import { useForm } from 'react-hook-form';
import { useAuth } from "../context/AuthContext.jsx";
import { Link } from "react-router-dom";
import Modal from "../components/Modal.jsx";
import MainLayout from "../Layout/MainLayout.jsx";
import SubjectsSelect from "../components/SubjectsSelect.jsx";
import PayPalPayment from '../components/PayPalPayment.jsx';
import PDF from "../components/PDF.jsx";

function ICFESPage() {
    const { user } = useAuth();
    const { register, handleSubmit } = useForm();
    const [icfes, setIcfes] = useState(null);
    const [loading, setLoading] = useState(false);

    const onSubmit = handleSubmit(async info => {
        setLoading(true);
        console.log(info);
        const res = await createIcfes({ ...info, token: window.localStorage.getItem('token') });
        setIcfes(res.data);
        console.log(res.data);
        setLoading(false);
    });

    return (
        <MainLayout>
            <form id="form-exam" className={`container mx-auto p-8 bg-white rounded-lg shadow-xl text-black ${!user && 'blur-lg'}`} onSubmit={onSubmit}>
                <h2 className="text-3xl font-bold mb-6 text-center uppercase text-indigo-700">Genera tus preguntas tipo ICFES</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="asignatura" className="block font-semibold text-gray-700">Asignatura</label>
                        <SubjectsSelect className="form-select w-full mt-2 p-3 border border-gray-300 rounded-lg shadow-sm" register={register} />
                    </div>
                    <div>
                        <label htmlFor="competencia" className="block font-semibold text-gray-700">Competencia</label>
                        <input type="text" className="form-input w-full mt-2 p-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-500" placeholder="Competencia" {...register("competence", { required: true })} />
                    </div>
                    <div>
                        <label htmlFor="cantidadEnunciados" className="block font-semibold text-gray-700">Cantidad de Enunciados</label>
                        <input type="number" className="form-input w-full mt-2 p-3 border border-gray-300 rounded-lg shadow-sm" min="1" max="3" {...register("questionCount", { required: true })} />
                    </div>
                    <div>
                        <label htmlFor="parrafoBase" className="block font-semibold text-gray-700">Párrafo Base</label>
                        <textarea className="form-input w-full mt-2 p-3 border border-gray-300 rounded-lg shadow-sm resize-none min-h-24 placeholder-gray-500" placeholder="Ingrese el párrafo del cual se generarán las preguntas" {...register("paragraph", { required: true })}></textarea>
                    </div>
                </div>
                <div className="flex justify-center mt-6 gap-4">
                    <button id="btn-generador" className="bg-indigo-600 text-white py-3 px-6 rounded-lg shadow-md font-semibold hover:bg-indigo-700 transition">Generar Examen</button>
                    <Link to='/icfes/preguntas'>
                        <button id="btn-generador" className="bg-blue-600 text-white py-3 px-6 rounded-lg shadow-md font-semibold hover:bg-blue-700 transition">Ver Preguntas</button>
                    </Link>
                </div>
            </form>

            {icfes && (
                <div key={icfes._id} className="bg-white mt-6 shadow-lg rounded-lg p-6 border border-gray-200">
                    <h3 className="text-xl font-semibold text-indigo-700">{icfes.subject}</h3>
                    <p className="text-sm text-gray-500">{icfes.competence}</p>
                    <hr className="my-4" />
                    <p className="text-gray-700 font-medium">Párrafo Base: <span className="font-normal">{icfes.paragraph}</span></p>
                    <p className="text-gray-900  font-bold">Cantidad de Enunciados:{icfes.questionCount}</p>
                    <div id="exam-content" className="mt-4 space-y-6">
                        {icfes?.questions?.map((question, index) => (
                            <div key={index} className="p-5 border-l-4 border-indigo-500 bg-gray-50 rounded-lg shadow-sm">
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
                </div>
            )}

            {icfes && <PDF examData={icfes} />}

            {loading && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
                        <h2 className="text-xl font-bold text-gray-800">Generando Examen...</h2>
                        <p className="text-gray-600 mt-2">Por favor, espera un momento.</p>
                    </div>
                </div>
            )}

            {!user && (
                <Modal message='Debes haber iniciado sesión para usar el generador de exámenes'>
                    <Link to="/login" className="bg-purple-600 font-bold text-white py-2 px-6 rounded-lg shadow-md hover:bg-purple-700 transition">Login</Link>
                </Modal>
            )}

            {user && !user.paymentID && (
                <Modal message='Para hacer uso del generador de exámenes debes adquirir nuestra membresía!!'>
                    <PayPalPayment />
                </Modal>
            )}
        </MainLayout>
    );
}

export default ICFESPage;
