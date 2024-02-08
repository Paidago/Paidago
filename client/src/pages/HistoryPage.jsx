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
    const [ activities, setActivities ] = useState([])

    const onSubmit = handleSubmit(async ({subject}) => {
        try{
            console.log(subject)
            let res
            if(subject === 'Todas')
                res = await getAllActivities(window.localStorage.getItem('token'))
            else
                res = await getActivitiesBySubject({ subject, token: window.localStorage.getItem('token') })
            setActivities(res.data)
        }catch(err){
            console.log(err)
        }
    }) 

    const getActivities = async () => {
        try {
            const res = await getAllActivities(window.localStorage.getItem('token'))
            setActivities(res.data)
        }catch(err) {
            console.log(err)
        }
    }

    useEffect(() => {
        if (user) getActivities()
    },[])

    return (
        <MainLayout>
            <form onSubmit={onSubmit} className={`container mx-auto p-8 bg-slate-200 rounded-lg shadow-md text-black ${!user && 'blur-lg'}`}>
                <label htmlFor="">Puedes filtrar las clases por asignatura!!</label>
                <SubjectsSelect className="form-select w-full mt-1 p-2 border border-black rounded-md shadow-sm" register={register} >
                    <option value='Todas'>Todas</option>
                </SubjectsSelect>
                <button className="bg-blue-500 text-white py-2 px-4 rounded-md">Filtrar</button>
            </form>
            {
                user && activities && activities.map(activity => (
                    <li key={activity._id}>
                        <p>{activity.methodology}</p>
                        <p>{activity.topic}</p>
                        <p>{activity.competence}</p>
                        <p>{activity.subject}</p>
                        <p>{activity.tools}</p>
                        <p>{activity.generatedClass}</p>
                    </li>
                ))
            }
            { !user && 
                <Modal message='Debes haber iniciado sesion para ver tu historial'>
                    <Link to="/login" className="bg-purple-500 w-20 font-bold text-white py-2 px-4 rounded-md">Login</Link>
                </Modal>
            }
        </MainLayout>
    )
}

export default History