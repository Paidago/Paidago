import { getIcfesBySubject } from "../api/icfes.js"
import { useForm } from 'react-hook-form'
import { useState } from "react"
import MainLayout from "../Layout/MainLayout"
import SubjectsSelect from "../components/SubjectsSelect.jsx"
import { useAuth } from "../context/AuthContext"
import { Link } from "react-router-dom"
import Modal from "../components/Modal.jsx"

function BancoDePreguntasPage() {
    const { user } = useAuth()
    const { register, handleSubmit } = useForm()
    const [icfes, setIcfes] = useState([])

    const onSubmit = handleSubmit(async ({ subject }) => {
        try {
            console.log(subject)
            const res = await getIcfesBySubject({ subject, token: window.localStorage.getItem('token') })
            console.log(res)
            setIcfes(res.data)
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
                icfes && icfes.map((icfe, index) => (
                    <div key={icfe._id} className="bg-white mt-4 shadow-md rounded-lg p-5 border mb-4">
                        <h3 className="text-lg font-semibold text-indigo-600">{icfe.subject}</h3>
                        <p className="text-sm text-gray-500">{icfe.competence}</p>
                        <hr className="my-3" />
                        <div className="text-gray-700 space-y-2">
                            <p><span className="font-semibold">Párrafo Base:</span> {icfe.paragraph}</p>
                            <p><span className="font-semibold">Cantidad de Enunciados:</span> {icfe.questionCount}</p>
                        </div>

                        <div id="exam-content" className="space-y-6">
                            {icfe?.questions?.map((question, index) => (
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
                                    <p className="text-lg font-semibold text-gray-800">{question.correctAnswer}</p>
                                </div>
                                
                            ))}
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

export default BancoDePreguntasPage