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
            <form id="form-exam" className={`container mx-auto p-8 bg-slate-200 rounded-lg shadow-md text-black ${!user && 'blur-lg'}`} onSubmit={onSubmit}>
                <h2 className="text-2xl font-bold mb-4 text-center uppercase">Genera tus preguntas tipo ICFES</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="mb-4">
                        <label htmlFor="asignatura" className="block text-black">Asignatura</label>
                        <SubjectsSelect className="form-select w-full mt-1 p-2 border border-black rounded-md shadow-sm" register={register} />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="competencia" className="block text-black">Competencia</label>
                        <input type="text" className="form-input w-full mt-1 p-2 border border-black rounded-md shadow-sm placeholder:text-black" placeholder="Competencia" {...register("competence", { required: true })} />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="cantidadEnunciados" className="block text-black">Cantidad de Enunciados</label>
                        <input type="number" className="form-input w-full mt-1 p-2 border border-black rounded-md shadow-sm" min="1" max="3" {...register("questionCount", { required: true })} />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="parrafoBase" className="block text-black">Párrafo Base</label>
                        <textarea className="form-input w-full mt-1 p-2 border border-black rounded-md shadow-sm resize-none min-h-20 placeholder:text-black" placeholder="Ingrese el párrafo del cual se generarán las preguntas" {...register("paragraph", { required: true })}></textarea>
                    </div>
                </div>
                <div className="mt-4">
                    <button id="btn-generador" className="bg-blue-500 text-white py-2 px-4 rounded-md">Generar Examen</button>
                </div>
            </form>

            {
                icfes && (
                    <div key={icfes._id} className="bg-white mt-4 shadow-md rounded-lg p-5 border mb-4">
                        <h3 className="text-lg font-semibold text-indigo-600">{icfes.subject}</h3>
                        <p className="text-sm text-gray-500">{icfes.competence}</p>
                        <hr className="my-3" />
                        <div className="text-gray-700 space-y-2">
                            <p><span className="font-semibold">Párrafo Base:</span> {icfes.paragraph}</p>
                            <p><span className="font-semibold">Cantidad de Enunciados:</span> {icfes.questionCount}</p>
                        </div>

                        <div id="exam-content" className="space-y-6">
                            {icfes?.questions?.map((question, index) => (
                                <div key={index} className="p-4 border-l-4 border-indigo-500 bg-gray-100 rounded-md shadow-sm">
                                    <p className="text-lg font-semibold text-gray-800">
                                        {question.statement}
                                    </p>
                                    <ul className="mt-2 space-y-2">
                                        {question.options.map((option, i) => (
                                            <li key={i} className="flex items-center space-x-2">
                                                <input type="radio" name={`question-${index}`} className="h-4 w-4 text-indigo-600" />
                                                <span className="text-gray-700">{option}</span>
                                            </li>
                                        ))}
                                    </ul>

                                </div>
                            ))}
                        </div>
                    </div>

                )
            }

            {
                icfes && <PDF examData={icfes} />
            }

            {
                loading && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                            <h2 className="text-xl font-bold mb-4">Generando Examen...</h2>
                            <p className="text-gray-700">Por favor, espera un momento.</p>
                        </div>
                    </div>
                )
            }

            {!user &&
                <Modal message='Debes haber iniciado sesión para usar el generador de exámenes'>
                    <Link to="/login" className="bg-purple-500 w-20 font-bold text-white py-2 px-4 rounded-md">Login</Link>
                </Modal>
            }

            {user && !user.paymentID && (
                <Modal message='Para hacer uso del generador de exámenes debes adquirir nuestra membresía!!'>
                    <PayPalPayment />
                </Modal>
            )}
        </MainLayout>
    );
}

export default ICFESPage;
