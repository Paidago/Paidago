import { getAllActivities, getActivitiesBySubject } from "../api/activity"
import { useForm } from 'react-hook-form'
import { useState, useEffect } from "react"
import MainLayout from "../Layout/MainLayout"
import SubjectsSelect from "../components/SubjectsSelect.jsx"
import { useAuth } from "../context/AuthContext"
import { Link } from "react-router-dom"
import Modal from "../components/Modal.jsx"

function History() {
    const { user } = useAuth()
    const { register, handleSubmit } = useForm()
    const [activities, setActivities] = useState([])

    // Función para resaltar palabras en mayúscula
    const highlightUppercaseWords = (text) => {
        return text.split(/(\b[A-ZÁÉÍÓÚÑ]{3,}\b)/g).map((part, index) =>
            /^[A-ZÁÉÍÓÚÑ]+$/.test(part) ? (
                <p key={index} className="font-bold text-indigo-600 mt-2">{part}</p>
            ) : (
                <span key={index} className="text-gray-700">{part.replace(': ', '')}</span>
            )
        );
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

    const getActivities = async () => {
        try {
            const res = await getAllActivities(window.localStorage.getItem('token'))
            setActivities(res.data)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        if (user) getActivities()
    }, [])

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
                            <p className="text-gray-600 text-sm italic">{highlightUppercaseWords(activity.generatedClass)}</p>
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