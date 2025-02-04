import MainLayout from "../Layout/MainLayout"
import SubjectsSelect from "../components/SubjectsSelect.jsx"
import { useEffect, useState } from "react"
import { useForm } from 'react-hook-form'
import { createExam } from "../api/exam.js"
import { useAuth } from "../context/AuthContext"
import { Link } from "react-router-dom"
import Modal from "../components/Modal.jsx"

function CreateExam() {
    const { user } = useAuth()
    const { register, handleSubmit } = useForm()
    const [exam, setExam] = useState(null)


    const onSubmit = handleSubmit(async data => {
        console.log(data)
        const res = await createExam({ ...data, token: window.localStorage.getItem('token') })
        console.log('RESPUESTA',res)
        setExam(res.data)
    })

    useEffect(() => { console.log(exam) }, [exam])

    const ExamDisplay = ({ exam }) => {
        if (!exam || exam.questions.length === 0) {
            return (
                <div className="text-center text-gray-500 mt-8">
                    <p>📭 No hay un examen generado aún.</p>
                </div>
            );
        }
    }

    return (
        <MainLayout>
            <div className="max-w-3xl mx-auto p-6">
                <h1 className="text-3xl font-bold text-center text-indigo-600 mb-4">📚 ¡Crea tu Examen!</h1>
                <p className="text-gray-700 text-center mb-6">
                    Con las clases que has creado, puedes generar un examen personalizado según tus necesidades.
                </p>

                <form
                    onSubmit={onSubmit}
                    className={`bg-white p-6 rounded-lg shadow-lg transition-all duration-300 ${!user ? "blur-md opacity-70" : ""}`}
                >
                    {/* Filtro por asignatura */}
                    <div className="mb-4">
                        <label htmlFor="subject" className="block text-lg font-semibold text-gray-800">
                            📌 Filtra las clases por asignatura:
                        </label>
                        <SubjectsSelect className="w-full mt-2 p-3 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-300" register={register} />
                    </div>

                    {/* Especificaciones del examen */}
                    <div className="mb-6">
                        <label htmlFor="especificaciones" className="block text-lg font-semibold text-gray-800">
                            ✍️ Especificaciones del examen:
                        </label>
                        <textarea
                            placeholder="Ejemplo: 10 preguntas, 5 de selección múltiple, 5 abiertas..."
                            className="w-full mt-2 p-3 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-300 resize-none"
                            name="especificaciones"
                            {...register("especifications", { required: true })}
                        ></textarea>
                    </div>

                    {/* Botón de creación */}
                    <div className="text-center">
                        <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 shadow-md">
                            🚀 Crear Examen
                        </button>
                    </div>
                </form>
            </div>
            <div className="max-w-3xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-lg">
                {
                    exam && (
                        <>
                            <h2 className="text-2xl font-bold text-indigo-600 text-center mb-4">📖 Examen Generado</h2>
                            <p className="text-gray-700 text-center mb-6">
                                Responde cada pregunta con atención. ¡Buena suerte! 🍀
                            </p>
                        </>
                    )
                }

                <div className="space-y-6">
                    {exam?.questions?.map((question, index) => (
                        <div key={index} className="p-4 border-l-4 border-indigo-500 bg-gray-100 rounded-md shadow-sm">
                            <p className="text-lg font-semibold text-gray-800">
                                {question.text}
                            </p>

                            {question.type === "multiple-choice" ? (
                                <ul className="mt-2 space-y-2">
                                    {question.options.map((option, i) => (
                                        <li key={i} className="flex items-center space-x-2">
                                            <input type="radio" name={`question-${index}`} className="h-4 w-4 text-indigo-600" />
                                            <span className="text-gray-700">{option}</span>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <textarea
                                    placeholder="Escribe tu respuesta aquí..."
                                    className="w-full mt-2 p-3 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-300 resize-none"
                                ></textarea>
                            )}
                        </div>
                    ))}
                </div>

                {
                    exam && (
                        <div className="text-center mt-6">
                            <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 shadow-md">
                                ✅ Enviar Respuestas
                            </button>
                        </div>
                    )
                }
            </div>

            <ExamDisplay exam={exam} />

            {!user &&
                <Modal message='Debes haber iniciado sesion para crear tus examenes'>
                    <Link to="/login" className="bg-purple-500 w-20 font-bold text-white py-2 px-4 rounded-md">Login</Link>
                </Modal>
            }
        </MainLayout>
    )
}

export default CreateExam